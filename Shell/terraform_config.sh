#!/bin/bash
##Download and install Terraform
#Ensure that your system is up to date and you have installed the gnupg, software-properties-common, and curl packages installed.
#You will use these packages to verify HashiCorp's GPG signature and install HashiCorp's Debian package repository.
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

#Install the HashiCorp GPG key.
wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

#Verify the key's fingerprint.
gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint

#Add the official HashiCorp repository to your system.
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

#Download the package information from HashiCorp.
sudo apt update

#Install Terraform from the new repository.
sudo apt-get install terraform

#Install the terraform tab completion autocomplete package to the bash shell.
if test -f ~/.bashrc; then
  echo "bash configuration file \".bashrc\" file found."
  echo "Installing \"terraform autocomplete\" to enable shell tab completion."
  terraform -install-autocomplete
  echo "Installation completed for \"terraform autocomplete\" to enable shell tab completion."
fi

##Create the Terraform files
mkdir ~/terraform
cd ~/terraform

mkdir learn-terraform-docker-container

#Create `terraform.tf`. This file includes the `terraform` block, which defines the provider and Terraform versions you will use with this project.
echo "
terraform {
  required_providers {
    docker = {
      source  = \"kreuzwerker/docker\"
      version = \"~> 3.0.2\"
    }
  }
  required_version = \"~> 1.7\"
}
" > ./terraform.tf

#Create `main.tf`.
#The provider block configures the specified provider, in this case docker. A provider is a plugin that Terraform uses to create and manage your resources (e.g. docker, aws).
#Use resource blocks to define components of your infrastructure. A resource might be a physical or virtual component such as an EC2 instance, or it can be a logical resource such as a Heroku application.
echo "
provider \"docker\" {}

resource \"docker_image\" \"nginx\" {
  name         = \"nginx:latest\"
  keep_locally = false
}

resource \"docker_container\" \"nginx\" {
  image = docker_image.nginx.image_id
  name  = \"tutorial\"
  ports {
    internal = 80
    external = 8000
  }
}
" > ./main.tf


##Start the Terraform services
# Initialize the project, which downloads a plugin that allows Terraform to interact with Docker.
count=0
terraform init
while [[$? != 0 && $count -le 3]]
do
  count=count + 1
  terraform init
done
echo "Terraform started."

#Provision the NGINX server container with apply.
count=0
terraform apply -auto-approve
while [[$? != 0 && $count -le 3]]
do
  count=count + 1
  terraform apply -auto-approve
done
echo "Terraform infrastructure provisioned."

##Apply changes to the terraform configuration
##Stop the Terraform services
answer=""

terraform_change_destroy () {
while [$answer != "terraform apply" || $answer != "terraform destroy"]
do
  echo "Type \"terraform apply\" to apply changes to Terraform provisioned infrastructures or \n\ Type \"terraform destroy\" to destroy Terraform provisioned infrastructures:"
  read answer
done

if [$answer == "terraform apply"]
then
  #Start a subshell to make changes to the appropriate terraform files.
  echo "Make changes to Terraform file(s)."
  echo "A subshell is created for use to make changes. `exit` subshell to continue."
  (bash ;)
  echo "Changes were made to the Terraform file(s) and subshell has exited."

  apply_changes=""
  while [apply_changes != "y" || apply_changes != "n"]
  do
    echo "Apply changes to Terraform provisioned infrastructures? y/n"
    read apply_changes
  done

  if [apply_changes == y]
  then
    apply_changes=""

    #Apply changes to the terraform configuration
    echo "Making changes to Terraform provisioned infrastructures."
    terraform apply
    echo "Completed changes to Terraform provisioned infrastructures."
    answer=""
    terraform_change_destroy
  elif [apply_changes == n]
    apply_changes=""

    answer=""
  continue
  fi
elif [$answer == "terraform destroy"]
then
  #Stop the container and destroy the resources created.
  echo "Terraform provisioned infrastructures will be destroyed."
  terraform destroy -auto-approve
  echo "Terraform provisioned infrastructures destroyed."
else
fi
}

terraform_change_destroy















answer=""

while [$answer != "terraform destroy"]
do
    echo "Type \"terraform destroy\" to destroy Terraform provisioned infrastructures:"
    read answer
done

if [$answer == "terraform destroy"]; then
    echo "Terraform provisioned infrastructures will be destroyed."
    terraform destroy -auto-approve
    echo "Terraform provisioned infrastructures destroyed."
fi
