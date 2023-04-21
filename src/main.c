#include <esp_log.h>
#include <inttypes.h>
#include "driver/uart.h"
#include "driver/ledc.h"
#include "rc522.h"

#define BAUD_RATE 19200
#define BUZZER_GPIO 12  // TODO: check specific how to connect buzzer to gpio and change this value
#define BUZZER_DUR 250
#define BUZZER_FREQUENCY_HZ 550
#define BUZZER_RESOLUTION_BITS 8
#define BUZZER_DUTY_PERCENT 0.5

#define LEDC_CHANNEL (LEDC_CHANNEL_2)

#define STACK 128
#define BUZZER_STACK 1024

// based on the sample from https://github.com/abobija/esp-idf-rc522
static rc522_handle_t scanner;
static QueueHandle_t channelQueue;
static TaskHandle_t buzzerTaskHandle;

static void buzzer_task(void* arg)
{
    uint32_t channel;
    ledc_fade_func_install(0); // call before using `ledc_set_duty_and_update` to ensure that the fade service is installed
    while (1)
    {
        xQueueReceive(channelQueue, &channel, 0);
        
        ledc_set_duty_and_update(LEDC_HIGH_SPEED_MODE, channel, (1 << BUZZER_RESOLUTION_BITS) * BUZZER_DUTY_PERCENT, 0);
        vTaskDelay(BUZZER_DUR / portTICK_PERIOD_MS); // wait for 20 periods
        
        // Stop the PWM signal
        ledc_stop(LEDC_HIGH_SPEED_MODE, channel, 0);
        vTaskSuspend(NULL);
    }
}

static void rc522_handler(void* arg, esp_event_base_t base, int32_t event_id, void* event_data)
{
    rc522_event_data_t* data = (rc522_event_data_t*) event_data;
    rc522_tag_t* tag = (rc522_tag_t*) data->ptr;
    printf("%" PRIu64 "", tag->serial_number);
    printf("\n");
    
    uint32_t ledcChannel = LEDC_CHANNEL;
    xQueueSendToBack(channelQueue, &ledcChannel, 0);
    vTaskResume(buzzerTaskHandle);
}

void app_main()
{
    esp_rom_gpio_pad_select_gpio(BUZZER_GPIO);
    gpio_set_direction(BUZZER_GPIO, GPIO_MODE_OUTPUT);
    
    // Configure the PWM signal
    ledc_timer_config_t timeConf = {
        .duty_resolution = BUZZER_RESOLUTION_BITS,
        .freq_hz = BUZZER_FREQUENCY_HZ,
        .speed_mode = LEDC_HIGH_SPEED_MODE,
        .timer_num = LEDC_TIMER_0,
    };
    ledc_timer_config(&timeConf);

    ledc_channel_config_t ledcConf = {
        .channel = LEDC_CHANNEL,
        .gpio_num = BUZZER_GPIO,
        .speed_mode = LEDC_HIGH_SPEED_MODE,
        .timer_sel = LEDC_TIMER_0,
    };

    ledc_channel_config(&ledcConf);

    uart_set_baudrate(UART_NUM_0, BAUD_RATE);

    rc522_config_t config = {
        .spi.host = VSPI_HOST,
        .spi.miso_gpio = 19,
        .spi.mosi_gpio = 23,
        .spi.sck_gpio = 18,
        .spi.sda_gpio = 5,
    };

    channelQueue = xQueueCreate(STACK, sizeof(uint32_t));

    rc522_create(&config, &scanner);
    rc522_register_events(scanner, RC522_EVENT_ANY, rc522_handler, NULL);
    rc522_start(scanner);
    xTaskCreate(buzzer_task, "buzzer_task", BUZZER_STACK, NULL, 2, &buzzerTaskHandle);
    vTaskSuspend(buzzerTaskHandle);  // suspend the task until the first card is scanned
}
