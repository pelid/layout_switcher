# Как установить

Скачиваем репозиторий с github, кладем в исходники в каталог где будет искать расширения Gnome Shell:

```bash
cd ~/.local/share/gnome-shell/extensions/
git clone <repo url> layout_switcher@pelid80.gmail.com # destination folder name is matter
```

Перезапускаем оболочку чтобы Gnome Shell заметил новое расширение: <kbd>Alt</kbd>+<kbd>F2</kbd>, вводим команду `r` и наживаем <kbd>Enter</kbd>.

Активируем новое JS расширение. Для этого запускаем gnome-tweak-tool, активируем расширение на вкладке Extensions.

Осталось донастроить поведение клавиши <kbd>CapsLock</kbd>. Меняем стандартное поведение, отключаем переключение регистра букв по нажатию на <kbd>CapsLock</kbd>. Сделать это можно через вкладку Typing в gnome-tweak-tool: выбрать пункт "Caps Lock is also Ctrl".

# Проблемы:

Индикатор gnome shell keyboard (виджет в правом верхнем углу) неверно отображает статус из-за внутреннего кеша. Пробовал дергать за разные методы и классы gnome-shell/js/ui/status/keyboard.js чтобы заставить его сбросить кэш, но нащупать подходящий вариант не удалось. На изменения в gsettings виджет также не реагирует.

# Как разрабатывать

Заново скомпилировать gsettings схему:

```bash
glib-compile-schemas schemas
```

Документация по [glib-compile-schemas](https://developer.gnome.org/gio/2.52/glib-compile-schemas.html)

Посмотреть ошибки при установке расширения (в момент перезапуска Gnome Shell):

```bash
journalctl /usr/bin/gnome-shell -f -o cat
```

Полезные маниуалы:

- [Gnome Shell Extensions. Tutorial](https://wiki.gnome.org/Projects/GnomeShell/Extensions/StepByStepTutorial)
- [Gnome Shell Extensions](https://wiki.gnome.org/Projects/GnomeShell/Extensions)
- [Code example of AppKeys Extension](https://github.com/franziskuskiefer/app-keys-gnome-shell-extension/)
