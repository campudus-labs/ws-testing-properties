# Property-based testing

> Sartre: Die Hölle, das sind die anderen.  
> Dev: Die Hölle, das ist der Code der anderen.  
> Ich: Die Hölle, das ist mein Code von früher.

## Benötigte Software

- git (oder irgendeinen Weg, an die Files zu kommen)
- [Deno](https://deno.com/)

## Teil 1: Einführung property based testing

1. Öffne `components/string/reverse.test.ts` - "Bekanntes Vorgehen" bei Tests
2. Öffne `components/sorting/sorting.test.ts` - Einführung in Property Based Testing

Starte die Tests mit `deno test <path> [--watch]`.

# Weiter zur Übungsapp:

`git switch buggy-game`


## Struktur/Dev

Der Aufbau des Repos folgt der [Polylith-Architektur](https://polylith.gitbook.io/polylith/). [Zusammenfassung](https://davidvujic.github.io/python-polylith-docs/workspace/).

### TL;DR (Ordner-)Struktur:

- projects: Launch-Skripte, Env-Configs etc. für das Deployment von Apps
- development: Alles, was man so zum entwickeln braucht, aber nicht fürs fertige Produkt
- bases: Die Einsprungpunkte aller Apps
- components: Für sich stehende Einzelteile, die unter allen Apps geteilt werden können

