#include <esp_log.h>
#include <inttypes.h>
#include "driver/uart.h"
#include "rc522.h"

#define BAUD_RATE 9600
#define BUZZER_GPIO 12  // TODO: check specific how to connect buzzer to gpio and change this value
#define BUZZER_FREQUENCY_HZ 1000

// based on the sample from https://github.com/abobija/esp-idf-rc522

static rc522_handle_t scanner;

static void rc522_handler(void* arg, esp_event_base_t base, int32_t event_id, void* event_data)
{
    rc522_event_data_t* data = (rc522_event_data_t*) event_data;
    rc522_tag_t* tag = (rc522_tag_t*) data->ptr;
    printf("%" PRIu64 "", tag->serial_number);
    printf("\n");

    // Calculate the delay time based on the desired frequency
    uint32_t period_ms = 1000 / (2 * BUZZER_FREQUENCY_HZ); // divide by 2 because we toggle the buzzer on and off

    // TODO: currently the buzzer is not working, check how to make a loud sound out of it
    for (int i = 0; i < 100; i++) {
        gpio_set_level(BUZZER_GPIO, 1);
        vTaskDelay(period_ms / portTICK_PERIOD_MS);
        gpio_set_level(BUZZER_GPIO, 0);
        vTaskDelay(period_ms / portTICK_PERIOD_MS);
    }
}

void app_main()
{
    gpio_pad_select_gpio(BUZZER_GPIO);
    gpio_set_direction(BUZZER_GPIO, GPIO_MODE_OUTPUT);
    
    uart_set_baudrate(UART_NUM_0, BAUD_RATE);
    uart_set_baudrate(UART_NUM_1, BAUD_RATE);
    uart_set_baudrate(UART_NUM_2, BAUD_RATE);

    rc522_config_t config = {
        .spi.host = VSPI_HOST,
        .spi.miso_gpio = 19,
        .spi.mosi_gpio = 23,
        .spi.sck_gpio = 18,
        .spi.sda_gpio = 5,
    };

    // TODO: currently the I2C method based on the sample from github don't work. The above just a temporary solution
    // rc522_config_t config = {
    // .transport = RC522_TRANSPORT_I2C,
    // .i2c.sda_gpio = 18,
    // .i2c.scl_gpio = 19,
    // };

    rc522_create(&config, &scanner);
    rc522_register_events(scanner, RC522_EVENT_ANY, rc522_handler, NULL);
    rc522_start(scanner);
}
