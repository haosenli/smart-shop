#!/usr/bin/env python3
# The script kind of simulates what the platformio extension does in VSCode
import os, sys, subprocess

# parse the option from the command line
if len(sys.argv) > 1:
    option = sys.argv[1]
    extra_args = " ".join(sys.argv[2:])
    # check if the option is valid
    if option not in ['build', 'upload', 'clean', 'read']:
        print(f"Usage: {os.path.basename(sys.executable).replace('.exe', '')} {os.path.basename(__file__)} [option] where option is one of the following: build, upload, clean, or read")
        exit(1)
        
else:
    print(f"Usage: {os.path.basename(sys.executable).replace('.exe', '')} {os.path.basename(__file__)} [option] where option is one of the following: build, upload, clean, or read")
    exit(1)

if os.name == 'nt':
    platformio = os.path.join(os.path.expanduser('~'), '.platformio', 'penv', 'Scripts', 'platformio.exe')
else:
    platformio = os.path.join(os.path.expanduser('~'), '.platformio', 'penv', 'bin', 'platformio')
if not os.path.exists(platformio):
    # Platformio not exist, run setup from web
    try:
        import requests
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
        import requests
    import base64
    s = requests.Session()
    s.trust_env = None  # for anyone running on proxy
    r = s.get('https://api.github.com/repos/platformio/platformio-core-installer/contents/get-platformio.py?ref=develop').json()
    exec(base64.b64decode(r['content']))


params = {
    'build': f'run {extra_args}',
    'upload': 'run --target upload',
    'read': f'device monitor {extra_args}'
}

if "clean" in option:
    if os.name == 'nt':
        os.system(f'rmdir /s /q .pio')
    else:
        os.system(f'rm -rf .pio')
else:
    os.system(f'{platformio} {params[option]}')  # put one of the three function from above
