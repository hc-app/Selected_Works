#!/bin/sh
{
packages="tmux bash curl git google-chrome member libuser bash-completion"

default_shell() {
    if [ "$SHELL" = "/bin/bash" ]
    then
        echo "Default shell is bash"
    else
        chsh -s $(which bash) $USER
        echo "Default shell changed to bash"
    fi
}

# Command substitute $(command):
# Replaces the $(command) with the return value of the command's output;
# Command can be multiline seperated by semicolon; e.g. echo "hello $( var=world; echo "$var" )"
# Output can be saved to a variable for later use since it returns value. e.g. var="$(command)"

# Determine which OS is being used
if [ $(grep -c "ubuntu" /etc/os-release) -gt 0 ]
then
    apt-get update
    apt-get upgrade -y
    apt-get install -y $packages
    rm -rf /var/lib/apt/lists/*
    echo "Packages installed: $packages"

    default_shell
elif [ $(grep -c "alpine" /etc/os-release) -gt 0 ]
then
    apk update
    apk upgrade --available
    apk add $packages
    rm -rf /var/cache/apk/*
    echo "Packages installed: $packages"

    default_shell
else
    echo "Check Linux distribution's: ID"
fi

if [ "$?" = 0 ]
then
    echo "linux_distro_config.sh completed"
else
    echo "linux_distro_config.sh failed"
fi
} | tee -a "logfile_linux_distro_config_$(date +'%Y_%m_%d_%H%M%s').log"
