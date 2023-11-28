# Property-based testing

> Sartre: Die Hölle, das sind die anderen.  
> Dev: Die Hölle, das ist der Code der anderen.  
> Ich: Die Hölle, das ist mein Code von früher.

## Benötigte Software

- git (oder irgendeinen Weg, an die Files zu kommen)
- [Deno](https://deno.com/)

## Struktur/Dev

Der Aufbau des Repos folgt der
[Polylith-Architektur](https://polylith.gitbook.io/polylith/).
[Zusammenfassung](https://davidvujic.github.io/python-polylith-docs/workspace/).

### TL;DR (Ordner-)Struktur:

- projects: Launch-Skripte, Env-Configs etc. für das Deployment von Apps
- development: Alles, was man so zum entwickeln braucht, aber nicht fürs fertige
  Produkt
- bases: Die Einsprungpunkte aller Apps
- components: Für sich stehende Einzelteile, die unter allen Apps geteilt werden
  können

## Übungsapp

Das Repo enthält die ultimative Blackjack-Game-App 2023!

Leider hat sich mindestens ein Bug in der Spiellogik der Komponente
`@components/blackjack` eingeschlichen. Können wir unter Umständen eine testbare
Eigenschaft identifizieren, die uns weiterhilft?

Natürlich kann man auch das Frontend aufhübschen, sei es visuell,
UI/UX-bezüglich oder code-technisch...
