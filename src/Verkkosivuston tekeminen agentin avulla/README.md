# GM-Maestro

**Draftaa. Treidaa. Päätä ketkä pelaa.**

GM-Maestro on suomenkielinen NHL-manageripeli kaveriporukoille. Liiga, draft, kokoonpano, treidit ja fantasy-pisteet ovat samassa palvelussa. NHL-tilastoja ei kerätä käsin: ne haetaan otteluiden jälkeen ja pisteet lasketaan liigan säännöillä.

Julkinen osoite on [gm-maestro.fi](https://gm-maestro.fi). Palvelu on tällä hetkellä ilmainen.

## Mitä pelissä voi tehdä

1. **Luo tili** sähköpostilla ja nimellä. Tuotannossa osoite vahvistetaan linkillä ennen liigoihin pääsyä.
2. **Perusta liiga tai liity koodilla.** Perustaja valitsee joukkueiden määrän, draft-kierrokset, nostokiintiön ja liigan keston (koko NHL-kausi tai kiinteä päättymispäivä). Sama käyttäjä voi olla useassa liigassa.
3. **Draftaa snake-draftissa.** Vuorot kiertävät edestakaisin. Pelaajia voi hakea ja suodattaa pelipaikan mukaan. Draft käynnistyy, kun paikat ovat täynnä. Oletus on 12 kierrosta eli 12 pelaajaa joukkueessa. Kentälliseen kuuluu 1 maalivahti, 2 puolustajaa ja 3 hyökkääjää; ne täytetään ennen vapaita varauksia.
4. **Aseta kokoonpano.** Aktiivinen kentällinen näkyy kaukalonäkymässä, loput ovat vaihtopenkillä. Fantasy-pisteitä kertyy vain kentällä oleville, NHL:n runkosarjasta ja pudotuspeleistä. Vaihto lukittuu pelikierroksen ensimmäiseen otteluun (Suomen aika) ja aukeaa taas, kun kierroksen pelit on pelattu ja pisteet päivitetty.
5. **Treidaa.** Manageri tarjoaa omia pelaajiaan toisen joukkueen pelaajista. Eri määrä on mahdollinen, esimerkiksi kaksi yhdestä. Vastapuoli hyväksyy tai hylkää. Rosterissa on oltava vähintään 8 pelaajaa, ja molemmille pitää jäädä täysi kentällinen. Tyhjä paikka täyttyy treidillä, ei markkinalta. Pisteet jäävät joukkueelle, joka omisti pelaajan ottelupäivänä.
6. **Nosta vapaiden pelaajien markkinalta.** Nosto on aina yksi sisään ja yksi ulos. Se kuluttaa liigan nostokiintiön (0 = rajoittamaton). Markkina ja treidit aukeavat draftin jälkeen.
7. **Seuraa kautta.** Sarjataulukko, avoimet ja tehdyt treidit sekä nostot ovat Tilastot-sivulla. Otteluohjelma näyttää NHL-kierrokset Suomen ajassa. Pelaajakortista näkee, mistä pisteet kertyivät viime kierroksella tai koko kaudella.

Draft-välilehti poistuu kauden alettua. Varausjärjestys jää talteen Draft-historiassa.

## Julkiset sivut

Kirjautumatta näkyvät etusivu, peliohjeet, palvelukuvaus, tietosuojaseloste, käyttöehdot ja evästekuvaus. Tuki: tuki@gm-maestro.fi.

Sovelluksen voi asentaa puhelimeen tai tietokoneelle (PWA). Käyttöliittymä toimii myös mobiilissa.

## Platform

`/platform` on erillinen ylläpitonäkymä. Se ei käytä pelaajan tunnuksia: sisään kirjaudutaan palvelimen ylläpitosalasanalla (`PLATFORM_ADMIN_PASSWORD`).

Ylläpitäjä näkee yhteenvedon käyttäjistä, vahvistetuista sähköposteista, liigoista, drafteista ja treideistä. Sivulta voi avata käyttäjän tai liigan, vaihtaa liigan perustajaa, nollata käyttäjän salasanan ja poistaa käyttäjän tai liigan. Liigan poisto vaatii nimen vahvistuksen.

## Kolmannen osapuolen palvelut

| Palvelu | Käyttö |
|---|---|
| **[Resend](https://resend.com)** | Tilin vahvistussähköposti. Kutsu menee Resendin rajapintaan (`api.resend.com`). Lähettäjä on oletuksena `GM-Maestro <noreply@gm-maestro.fi>`. Linkki vanhenee 24 tunnissa, ja käyttäjä voi pyytää uuden. Ilman `RESEND_API_KEY`-avainta (paikallinen kehitys) tili vahvistuu automaattisesti eikä viestiä lähde. |
| **NHL:n julkinen rajapinta** (`api-web.nhle.com`) | Pelaajapooli, otteluohjelma ja boxscore-tilastot. Synkronointi ajetaan oletuksena aamulla Suomen aikaa, kun peliyön tulokset ovat saatavilla. |

Analytiikkaa, maksupalvelua tai muuta ulkoista seurantaa ei ole kytketty. Salasanat tallennetaan tiivisteinä (bcrypt). Alustan istunto on erillinen JWT, joka vanhenee kahdeksassa tunnissa.

## Tekninen rakenne

Frontend ja backend ovat erillisiä workspace-paketteja.

| Osa | Teknologiat |
|---|---|
| **Frontend** (`client/`) | React, TypeScript, Vite, Tailwind CSS, React Router, PWA |
| **Backend** (`server/`) | Node.js, Express, SQLite (`better-sqlite3`) |
| **Sähköposti** | Resend HTTP API |
| **Tilastot** | NHL Web API, automaattinen synkronointi ja pistelaskenta |

Paikallinen kehitys käynnistyy juuresta komennolla `npm run dev` (API ja käyttöliittymä). Tuotantobuild on `npm run build`. Ympäristömuuttujien malli on `.env.example`.

## Lisenssi

Yksityinen projekti. Kaikki oikeudet pidätetään.
