FROM --platform=linux/x86_64 node:20.11.0-bookworm-slim

WORKDIR /home/local/

# install necessary packages
RUN apt-get update && apt-get upgrade -y

# installing Watchman via Homebrew does not work (requires curl, git-all)
# RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
#     # add Homebrew to PATH
#     && (echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"') >> /root/.bashrc \
#     && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
# RUN . /root/.bashrc && brew update && brew install gcc

# use of yarn, for "faster and more reliable dependency management"
RUN yarn global add expo-cli
# `yarn create expo`, to create new app
