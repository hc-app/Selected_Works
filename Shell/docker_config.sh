#!/bin/bash
##Docker Desktop and Docker Engine (Ubuntu) and Docker CLI Completion (bash) Installation and Verification

###############################################################################################################################
#Verify application installation
verify_app () {
$app_name=$1
$app_cmd_start=$2
$app_cmd_stop=$3
#Start application in background using the & symbol at the end of a command
$app_cmd_start &
# Check if process is running using ps and $! (PID of last run background process)
${app_name}_pid=$!
ps c -eo pid,cmd,stat | grep ${app_name}_pid
# If ps return a result using PID then check status and then stop Docker Desktop
if [ "$?" = 0 ]
then
    echo "$app_name installed successfully."

    #Return value of Docker Desktop process status
    ${app_name}_status=ps o pid,stat | grep ${app_name}_pid | awk '{print $2}'
    if [ "${app_name}_status" = R ]
    then
        echo "${app_name} running successfully."
        #Stop application
        $app_cmd_stop
        echo "${app_name} closed successfully."
    else
        echo "${app_name} started but ps process status is: ${app_name}_status."
        #Stop application
        app_cmd_stop
        echo "${app_name} closed successfully."
    fi
else
    echo "${app_name} installation verification failed."
fi
}
###############################################################################################################################

###############################################################################################################################
#Docker Desktop
sudo apt install gnome-terminal
sudo apt-get update
sudo apt-get install ./docker-desktop-<version>-<arch>.deb

#Verify the Docker Desktop installation
verify_app docker_desktop $( systemctl --user start docker-desktop ) $( systemctl --user stop docker-desktop )
###############################################################################################################################

###############################################################################################################################
#Docker Engine
#Uninstall conflicting unofficial packages.
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

#Install the Docker packages.
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#Linux post-installation steps for Docker Engine
#https://docs.docker.com/engine/install/linux-postinstall/
#Create the docker group.
sudo groupadd docker
#Add your user to the docker group.
sudo usermod -aG docker $USER
#Activate the changes to groups:
newgrp docker

#Verify the Docker Engine installation
verify_app docker_engine $( sudo docker run hello-world ) $( docker stop hello-world && docker rm --force hello-world && docker container prune )
###############################################################################################################################

###############################################################################################################################
#CLI completion (Bash)
# Install bash-completion:
sudo apt install bash-completion
# Source the script in your shell configuration file:
cat <<EOT >> ~/.bashrc
if [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi
EOT

# Reload your shell configuration:
source ~/.bashrc

# Verify CLI completion installation, generate the Bash completion script using the docker completion command:
verify_app docker_cli_completion $( source ~/.bashrc ) $( mkdir -p ~/.local/share/bash-completion/completions && docker completion bash > ~/.local/share/bash-completion/completions/docker )
###############################################################################################################################

###############################################################################################################################
#Verification Code Snippets

#Verify application
# verify_app () {
# $app_name = $1
# $app_cmd_start = $2
# $app_cmd_stop = $3
# #Verify the application installation
# #Start application in background using the & symbol at the end of a command
# $app_cmd_start &
# # Check if process is running using ps and $! (PID of last run background process)
# ${app_name}_pid=$!
# ps c -eo pid,cmd,stat | grep ${app_name}_pid
# # If ps return a result using PID then check status and then stop Docker Desktop
# if [ "$?" = 0 ]
# then
#     echo "$app_name installed successfully."

#     #Return value of Docker Desktop process status
#     ${app_name}_status=ps o pid,stat | grep ${app_name}_pid | awk '{print $2}'
#     if [ "${app_name}_status" = R ]
#     then
#         echo "${app_name} running successfully."
#         #Stop application
#         $app_cmd_stop
#         echo "${app_name} closed successfully."
#     else
#         echo "${app_name} started but ps process status is: ${app_name}_status."
#         #Stop application
#         app_cmd_stop
#         echo "${app_name} closed successfully."
#     fi
# else
#     echo "${app_name} installation verification failed."
# fi
# }

# #Verify the Docker Desktop installation
# #Start Docker Desktop in background using the & symbol at the end of a command
# systemctl --user start docker-desktop &
# # Check if process is running using ps and $! (PID of last run background process)
# docker_desktop_pid=$!
# ps c -eo pid,cmd,stat | grep $docker_desktop_pid
# # If ps return a result using PID then check status and then stop Docker Desktop
# if [ "$?" = 0 ]
# then
#     echo "Docker Desktop installed successfully."

#     #Return value of Docker Desktop process status
#     docker_desktop_status=ps o pid,stat | grep $docker_desktop_pid | awk '{print $2}'
#     if [ "$docker_desktop_status" = R ]
#     then
#         echo "Docker Desktop running successfully."
#         #Stop Docker Desktop
#         systemctl --user stop docker-desktop
#         echo "Docker Desktop closed successfully."
#     else
#         echo "Docker Desktop started but ps process status is: $docker_desktop_status."
#         #Stop Docker Desktop
#         systemctl --user stop docker-desktop
#         echo "Docker Desktop closed successfully."
#     fi
# else
#     echo "Docker Desktop installation verification failed."
# fi

# #Verify the Docker Engine installation
# #Create and run a new container from the hello-world image.
# sudo docker run hello-world
# if [ $? = 0 ]
# then
#     echo "Docker Engine installed successfully."
#     #Stop container
#     docker stop hello-world
#     #Remove container
#     docker rm --force hello-world
#     #Remove all stopped containers
#     docker container prune
# else
#     echo "Docker Engine installation verification failed."
# fi


# #Verify CLI completion installation, generate the Bash completion script using the docker completion command:
# mkdir -p ~/.local/share/bash-completion/completions
# docker completion bash > ~/.local/share/bash-completion/completions/docker
###############################################################################################################################
