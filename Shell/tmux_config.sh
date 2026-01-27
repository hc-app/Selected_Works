#!/bin/sh

tpm() {
    cd ~
    git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
    echo "tmux plugin manager installed"
}

tmux_new_session() {
    tmux new-session
    echo "tmux session started"
}


if [ $(grep -c "ubuntu" /etc/os-release) -gt 0 ]
then
    apt install tmux -y
    echo "tmux installed/updated on Ubuntu"

    tpm

    tmux_new_session

elif [ $(grep -c "alpine" /etc/os-release) -gt 0 ]
then
    apk add tmux
    echo "tmux installed/updated on alpine-linux"

    tpm

    tmux_new_session

else
    echo "Check Linux distribution's: ID"
fi
