printf '\033c'
sudo pacman -S --noconfirm sed
sudo sed -i "s/^#ParallelDownloads = 5$/ParallelDownloads = 15/" /etc/pacman.conf
echo "ILoveCandy" | sudo tee -a /etc/pacman.conf

sudo pacman -S --noconfirm xorg xorg-server xorg-xinit xorg-xkill xorg-xsetroot \
  xorg-xbacklight xorg-xprop xorg-xinput xf86-input-libinput xf86-video-intel xf86-video-qxl xf86-video-amdgpu xf86-video-vmware \
  poppler zathura zathura-cb zathura-pdf-poppler \
  sxiv mpv ffmpeg imagemagick \
  fzf man-db pkgfile nitrogen xsel maim lxappearance lsd xcolor \
  neovim atool zip unzip unrar p7zip thunar thunar-archive-plugin thunar-volman \
  ntfs-3g git sddm bspwm picom dunst rofi sxhkd polybar kitty zsh redshift \
  pipewire pipewire-alsa pipewire-pulse pipewire-audio alsa-utils \
  dunst jq aria2 networkmanager network-manager-applet mpd mpc lf \
  xdg-user-dirs cronie deluge deluge-gtk firefox github-cli \
  bluez bluez-utils yt-dlp

sudo systemctl enable NetworkManager
sudo systemctl enable sddm
systemctl --user enable mpd
systemctl --user enable deluged

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

cd $HOME
git clone --bare --depth=1 https://github.com/aman333nolawz/dotfiles.git .dotfiles
alias config='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
config config --local status.showUntrackedFiles no

# paru: AUR helper
sudo pacman -S --needed base-devel
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si

paru -S --noconfirm i3lock-color ksuperkey ctpv-git gomp-git \
  networkmanager-dmenu-git pfetch protonvpn
