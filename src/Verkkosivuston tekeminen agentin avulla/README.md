# GM-Maestro

- Tuotanto: [gm-maestro.fi](https://gm-maestro.fi)
- Tuki: `tuki@gm-maestro.fi` (Namecheap/cPanel + Gmail-sovelluksessa erillinen tili)

---

## Mitä projekti on (lyhyesti)

NHL-fantasymanageri kaveriporukalle: liiga, snake-draft, kokoonpano, treidit, vapaiden pelaajien markkina, sarjataulukko. NHL-tilastot haetaan rajapinnasta; fantasy-pisteet lasketaan palvelimella. React-käyttöliittymä + Node/Express-API + SQLite. Suomeksi, PWA.

---

## Pelin kulku

1. Tili (sähköposti + vahvistus tuotannossa).
2. Liiga: perustaja tai liittyminen koodilla; asetukset (joukkueet, draft-kierrokset, nostokiintiö, kesto).
3. Snake-draft, pelaajahaku; kentällinen (1 MV, 2 P, 3 H) ennen vapaita varauksia.
4. Kausi: lineup, lukko pelikierroksen mukaan; pisteet vain kentällä.
5. Treidit ja markkina draftin jälkeen; tilastot-sivu (sarja + tapahtumat).
6. Draft-välilehti poistuu kauden alettua; historia säilyy.

Julkiset sivut ilman kirjautumista: etusivu, ohjeet, lakitekstit, palvelukuvaus.

---

## Tietokanta — miten toteutettu ja mistä löytyy

GM-Maestro käyttää relaatiotietokantaa SQLite-muodossa. Se on yksi tiedosto palvelimella, ei erillistä tietokantapalvelinta kuten PostgreSQL. Backend (Node.js) käyttää kirjastoa `better-sqlite3` ja lukee sekä kirjoittaa tietokantaan SQL-kyselyillä.

Käyttäjät, liigat, draftit, rosterit, treidit ja fantasy-pisteet tallennetaan tauluihin, joilla on viiteavaimet (esim. liiga → jäsenet → pelaajat). Skeema ja pienet päivitykset ovat koodissa; kun API käynnistyy, taulut luodaan tai päivitetään automaattisesti.

**Kaavio:** selain → REST API (`server/src/`) → SQL → `app.db`.

| Asia | Paikka |
|------|--------|
| Skeema, `CREATE TABLE`, käynnistyksen `ALTER`-päivitykset | `server/src/db.js` |
| Kehityksen tietokantatiedosto | `server/data/app.db` |
| Tuotannon polku (jos eri) | `SQLITE_PATH` env (ks. `.env.example`) |
| Varmuuskopiot | `server/src/dbBackup.js` |
| Liiga-/draft-/roster-logiikka (SQL-kyselyt) | `server/src/leagues.js` ja muut moduulit |

Frontend ei koske tietokantaan. `app.db` ei kuulu gitiin; repossa on rakenne ja logiikka, data syntyy käytössä.

SQLite-asetukset (`db.js`): WAL, `foreign_keys = ON`, `busy_timeout`.

Esimerkkitauluja: `users`, `leagues`, `league_members`, `draft_picks`, `rosters`, treidit/nostot, vahvistustokenit, jne.

---

## Arkkitehtuuri

| Kerros | Teknologia | Kansio |
|--------|------------|--------|
| UI | React (näkymät ja komponentit), TypeScript (Koodi), Vite (build ja dev-palvelin), Tailwind (tyylit), PWA (asennus puhelimeen) | `client/` |
| API | Node.js (palvelin), Express (HTTP-reitit), JWT (kirjautuneen istunto), bcrypt (salasanojen tiiviste) | `server/src/` |
| Tietokanta | SQLite (yksi tiedosto, relaatiotaulut), better-sqlite3 (SQL Node-puolella) | `server/data/app.db` |
| Tilastot | NHL Web API (ottelut ja boxscore), synkka (aamulla peliyön jälkeen), pistelaskenta (liigan säännöt → fantasy-pisteet) | `server/src/nhl*.js`, `scoring*.js` |
| Sähköposti | Resend (vain lähetys), vahvistuslinkki rekisteröintiin (`emailVerify.js`) | `server/src/email.js`, `emailVerify.js` |

Repon juuri: npm workspaces (`client` + `server`). Dev: `npm run dev`. Build: `npm run build`. Env-malli: `.env.example`.

---

## Platform (ylläpito)

- Reitit: `/platform/login`, `/platform`
- Salasana: `PLATFORM_ADMIN_PASSWORD` (ei pelaajatilejä)
- Koodi: `server/src/platformAdmin.js`, `client/src/pages/platform/`
- Toiminnot: käyttäjät, liigat, salasanan nollaus, komission vaihto, poistot

---

## Ulkoiset palvelut

| Palvelu | Mihin |
|---------|--------|
| Resend | Rekisteröinnin vahvistusviesti (`noreply@gm-maestro.fi`) |
| NHL API | Pelaajapooli, otteluohjelma, boxscore |
| Namecheap hosting | `tuki@` postilaatikko (IMAP); DNS Domainhotellissa |
| Hetzner VPS | API + staattinen frontend (`client/dist`) |

Ei analytiikkaa / maksuja tuotannossa (tällä hetkellä).

---

## Reitit / sivut (muistin tueksi)

- Julkinen: `/`, `/login`, `/register`, `/ohjeet`, `/tietosuoja`, `/kayttoehdot`, `/evasteet`, `/palvelukuvaus`
- Peli: `/home`, `/league/:id/roster|draft|pelipaiva|tilastot`
- Config: `client/src/config/site.ts`, reitit `client/src/App.tsx`

---

## Lisenssi

Yksityinen projekti.
