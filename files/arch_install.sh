printf '\033c'
sudo pacman -S --noconfirm sed curl
sudo sed -i "s/^#ParallelDownloads = 5$/ParallelDownloads = 15/" /etc/pacman.conf
echo "ILoveCandy" | sudo tee -a /etc/pacman.conf

# sudo pacman -S --noconfirm xorg xorg-server xorg-xinit xorg-xkill xorg-xsetroot \
#   xorg-xbacklight xorg-xprop xorg-xinput xf86-input-libinput \
#   xf86-video-intel intel-media-driver xf86-video-qxl xf86-video-amdgpu xf86-video-vmware \
#   poppler zathura zathura-cb zathura-pdf-poppler \
#   sxiv mpv ffmpeg imagemagick \
#   fzf man-db pkgfile nitrogen xsel maim lxappearance lsd xcolor \
#   neovim atool zip unzip unrar p7zip thunar thunar-archive-plugin thunar-volman \
#   ntfs-3g git sddm bspwm picom dunst rofi sxhkd polybar kitty zsh redshift \
#   pipewire pipewire-alsa pipewire-pulse pipewire-audio alsa-utils \
#   dunst jq aria2 networkmanager network-manager-applet mpd mpc lf \
#   xdg-user-dirs cronie deluge deluge-gtk firefox github-cli \
#   bluez bluez-utils yt-dlp bat-extras npm tlp tlp-rdw
sudo pacman -S --noconfirm `curl https://aman333nolawz.github.io/files/packages.txt`

sudo systemctl enable NetworkManager --now
sudo systemctl enable sddm
systemctl --user enable mpd --now
systemctl --user enable redshift --now

# Power Savin
sudo systemctl mask systemd-rfkill.service
sudo systemctl mask systemd-rfkill.socket
sudo systemctl enable tlp --now

read -r -d '' suspendFileContent << EOM
[Unit]
Description=User suspend actions
Before=sleep.target

[Service]
User=%I
Type=forking
Environment=DISPLAY=:0
ExecStart=/home/%i/.config/bspwm/bin/bsplock
ExecStartPost=/usr/bin/sleep 1

[Install]
WantedBy=sleep.target
EOM

sudo mkdir -p /etc/systemd/system/
echo "$suspendFileContent" | sudo tee /etc/systemd/system/suspend@.service

sudo systemctl enable suspend@nolawz.service

sudo ln -s /usr/share/X11/xorg.conf.d/40-libinput.conf /etc/X11/xorg.conf.d/40-libinput.conf

read -r -d '' touchpadFileContent << EOM
Section "InputClass"
	Identifier "touchpad"
	MatchIsTouchpad "true"
	MatchDriver "libinput"
	Option "NaturalScrolling" "true"
  Option "Tapping" "on"
EndSection
EOM

echo "$touchpadFileContent" | sudo tee /etc/X11/xorg.conf.d/30-touchpad.conf

# paru: AUR helper
sudo pacman -S --needed base-devel
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si

paru -S --noconfirm i3lock-color ksuperkey ctpv-git gomp-git \
  networkmanager-dmenu-git pfetch protonvpn auto-cpufreq

sudo systemctl enable --now auto-cpufreq

# Changing grub theme
tput setaf 4 && echo "[.] Changing Grub theme..."
sudo mkdir -p /boot/grub/themes
sudo git clone https://github.com/aman333nolawz/grub-theme /boot/grub/themes/virtuaverse
sudo rm -rf /boot/grub/themes/virtuaverse/.git
sudo awk -i inplace '/GRUB_THEME=/ {gsub(/"[^"]+"/, "\"/boot/grub/themes/virtuaverse/theme.txt\"")} 1' /etc/default/grub
sudo grub-mkconfig -o /boot/grub/grub.cfg
tput setaf 2 && echo "[+] Grub theme set!"

# Changing SDDM theme
tput setaf 4 && echo "[.] Changing SDDM theme..."
sudo mkdir -p /usr/share/sddm/themes/
sudo git clone https://github.com/aman333nolawz/sddm-sugar-candy /usr/share/sddm/themes/sugar-candy
sudo rm -rf /usr/share/sddm/themes/sugar-candy/.git/
sudo cp /usr/lib/sddm/sddm.conf.d/default.conf /etc/sddm.conf
sudo sed -i "s/Current=.*/Current=sugar-candy/" /etc/sddm.conf
tput setaf 2 && echo "[+] SDDM theme set!"

# Dotfiles
tput setaf 4 && echo "[.] Cloning dotfiles..."
cd $HOME
git clone --bare --depth=1 https://github.com/aman333nolawz/dotfiles.git .dotfiles
alias config='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
config config --local status.showUntrackedFiles no
rm -rf .config
config checkout || exit
tput setaf 2 && echo "[+] Dotfiles are all ready!"

tput setaf 4 && echo "[.] Setting up fonts"
cd $HOME
sudo mkdir -p /usr/local/share/fonts/nerd-fonts/
sudo cp ".local/share/fonts/nerd-fonts/Fira Code Regular Nerd Font Complete.ttf" /usr/local/share/fonts/nerd-fonts/
tput setaf 2 && echo "[+] Fonts are ready to used!"
