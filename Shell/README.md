# Bash shell scripts

The following shell scripts can be run to automate installation of a preconfigured development environment.

## Linux Distribution (Ubuntu / Alpine) Application Installation
The shell script is for installing predefined packages on a Linux system. It displays and save the shell script's progress onto a log file. It is a template setup for Ubuntu or Alpine distributions using bash. It's intended purpose is to automate setup a new Linux distribution to a pre-configured environment. It can be used for spinning up new virtual environments such as docker containers or virtual machines for test environments. It can also expedite setting up cold sites where the infrastructure might be different from the production infrastructure.
`linux_distro_config.sh`

## Application Configuration
The shell script is for installing applications on a Linux system. It displays and save the shell script's progress onto a log file. It is a template setup for Ubuntu or Alpine distributions using bash. It's intended purpose is to automate setup of an application's installation configurations. It can be used as part of a yaml file for Docker builds or any other infrastructure as code. It can also expedite setting up cold sites where the infrastructure might be different from the production infrastructure.
`docker_config.sh`
`terraform_config.sh`
`tmux_config.sh`