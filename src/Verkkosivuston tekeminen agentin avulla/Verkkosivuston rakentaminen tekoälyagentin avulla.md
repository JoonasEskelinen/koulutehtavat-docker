# Palautus: GM-Maestro

**Tehtävä:** Verkkosivuston rakentaminen tekoälyagentin avulla  
**Työ:** GM-Maestro, NHL-fantasymanageripeli kaveriporukoille (`https://gm-maestro.fi`)  
**Tekijä:** Joonas Eskelinen
**Tekoäly:** Cursor-agentti, kielimalleina composer 2.5, grok 4,6, opus 5,5. Käyttö on ilmoitettu tässä dokumentissa.


Informaatio on peliohjeissa, palvelukuvauksessa ja lakisivuilla. Lokimerkinnät on koottu oikeista kehityskeskusteluista (toukokuu–syyskuu 2026). Tekoälyn ehdotuksia on muokattu, hylätty ja korjattu itse. Vastuu sisällöstä ja toiminnasta on opiskelijalla.


---

## 1. Projektikuvaus / sivuston laajuus

### Kohderyhmä

Kohderyhmä on porukat, jotka haluaa pelata NHL-fantasymanager peliä yhdessä.

Käyttäjä:
- perustaa liigan tai liittyy siihen koodilla
- draftaa joukkueen
- päättää ketkä pelaavat minäkin pelipäivänä (aktiivinen kentällinen ja vaihtopenkki)
- treidaa pelaajie muiden kimpan pelaajien kanssa ja nostaa pelaajia vapaiden markkinalta. Vapaat pelaajat ovat sellaisia jota kukaan ei ole valinnut draftissa.
- seuraa sarjataulukkoa, kun NHL-tilastot päivittyvät automaattisesti

Kieli on suomi. Ajat näytetään Suomen ajassa, koska ottelut pelataan Pohjois-Amerikan yössä.

Tekoälylle annettiin alussa tavoite: kirjautuminen, liigan luonti, draft ja pelipäivät samassa palvelussa, sekä oma backend. Kohderyhmä tarkentui myöhemmin tuotantovaiheessa: ensin ilmainen peli, jonka idea näkyy ilman kirjautumista landingpagella.

### Rakenne

Sivustossa on 16 reittiä ja toimiva navigaatio.

**Julkinen puoli** (ylätunniste: Peliohjeet, Palvelu, Kirjaudu, Luo tili; alatunniste: tietosuoja, käyttöehdot, evästeet, palvelukuvaus, peliohjeet, tukisähköposti):

| Reitti | Sivu | Tehtävän sivutyyppi |
|---|---|---|
| `/` | Etusivu | Etusivu |
| `/login` | Kirjautuminen | Lomake |
| `/register` | Tilin luonti | Lomake |
| `/verify-email` | Sähköpostin vahvistus | Tili |
| `/ohjeet` | Peliohjeet | Ohjeet / UKK-tyylinen sisältö |
| `/palvelukuvaus` | Palvelukuvaus ja tuki | Palvelu ja yhteystiedot |
| `/tietosuoja` | Tietosuojaseloste | Tietosuojasivu |
| `/kayttoehdot` | Käyttöehdot | Lakisivu |
| `/evasteet` | Evästeet | Lakisivu |
| `/platform/login` | Ylläpidon kirjautuminen | Hallinta |
| `/platform` | Ylläpito | Hallinta |

**Kirjautunut puoli:**

| Reitti | Sivu | Tehtävän sivutyyppi |
|---|---|---|
| `/home` | Omat liigat | Henkilökohtainen etusivu, kortit |
| `/league/:id/roster` | Kokoonpano | Palvelu: rosteri |
| `/league/:id/draft` | Draft ja pelaajahaku | Palvelu: draft |
| `/league/:id/pelipaiva` | Otteluohjelma | Palvelu: pelipäivä |
| `/league/:id/tilastot` | Sarjataulukko ja liigan tapahtumat | Palvelu: tilastot |

Vanha osoite `/league/:id/tapahtumat` ohjaa tilastosivulle. Tapahtumat (treidit ja nostot) ovat tilastosivun osio, ei erillinen välilehti.

**Palvelusisällöt (vähintään viisi):** draft, fantasy-pisteet, kokoonpano, treidit, vapaiden pelaajien markkina, otteluohjelma ja sarjataulukko. Etusivu esittelee neljä pääpalvelua korteilla. Peliohjeet avaavat samat asiat säännöiksi.

**Ohjeosiot peliohjeissa (blogin sijaan, kahdeksan osiota):**
1. Liittyminen ja roolit
2. draft
3. Kokoonpano ja pisteet
4. Vapaiden pelaajien markkina
5. Treidit
6. Tilastot
7. Otteluohjelma
8. Liigan kesto

Lisäksi pisteytystaulukot hyökkääjille, puolustajille ja maalivahdeille.

Erillistä blogia ei ole. Tuote on peli, joten “artikkelit” ovat peliohjeita. Tämä on sovellettu tehtävänannosta.

**UKK:** yleisimmät säännöt ovat peliohjeissa (kuka saa pisteitä, milloin lineup lukittuu, miten draft etenee, miten nosto toimii). Erillistä FAQ-sivua ei ole.

**Yhteystiedot:** alatunniste ja palvelukuvauksen tuki-osio, sähköposti `tuki@gm-maestro.fi`. Erillistä yhteydenottolomaketta ei ole. Lomakkeet ovat rekisteröinti, kirjautuminen, liigaan liittyminen ja treidiehdotus.

### Teknologia

| Osa | Teknologia |
|---|---|
| Käyttöliittymä | React (käyttöliittymän rakentaminen), TypeScript (koodikieli), Vite (Kehitysympäristö, projektin käynnistys/rakennus), Tailwind CSS (tyylit) |
| Sovellus puhelimessa | PWA (asennuspainike) |
| Palvelin | Node.js (Ajaa TypeScript-koodia palvelimella), Express (Node.js:n kirjasto, jolla rakennetaan palvelimen reitit ja API:t) |
| Tietokanta | SQLite |
| Tilastot | NHL:n julkinen rajapinta, aamulla Suomen aikaa |
| Julkaisu | Tuotantobuild, tiedostojen siirto palvelimelle, prosessin uudelleenkäynnistys kun backend muuttuu |

### Navigaatio

- Julkisilla sivuilla yhteinen kuori: logo vie etusivulle, linkit ohjeisiin ja palvelukuvaukseen, kirjautuminen ja tilin luonti.
- Liigassa sivupalkki tietokoneella ja alanavigaatio puhelimessa: Roster, Draft (vain ennen kauden alkua), Otteluohjelma, Tilastot.
- Takaisin omiin liigoihin -linkki on liiganäkymässä.

---

## 2. Toiminnallisuudet


1. **Lomakkeet.** Rekisteröinti, kirjautuminen, sähköpostivahvistus (resend), liigan perustaminen ja liittyminen koodilla, treidiehdotus.
2. **Responsiivisuus.** Julkinen header, liigakortit, liigan alanavigaatio puhelimessa, rosterin vaihtopenkki joka ei jää yhteen kapeaan pylvääseen.
3. **Haku ja suodatus.** Draftissa pelaajahaku ja pelipaikkasuodatin. Lista näyttää enintään sata osumaa ja kehottaa rajaamaan hakua.
4. **Komponentit.** Liigakortit, ominaisuuskortit, pelaajakortit, kulta- ja toissijaiset napit, tilan merkit (odottaa draftia / draft käynnissä / kausi käynnissä), pelaajan piste-erittely modaalissa.
5. **Kuvat.** Etusivun kaukalokuva ja rosterin jäätausta. Erillistä kuvagalleriaa ei ole.

---

## 3. Miten tekoälyä käytettiin

### 1. Suunnittelu

Pyysin sivuston ja sovelluksen rakenteen: kirjautuminen, liiga, draft ja backend samassa paketissa. Myöhemmin pyysin julkisen etusivun, josta pelin idean näkee kirjautumatta, sitten tietosuojan ja käyttöehdot.

Muutin suunnitelmaa itse useaan kertaan:
- Nimi kulki GMCoresta GM-Gurun kautta GM-Maestroon. GM-maestro tuntui vasta tarpeeksi uniikilta, muilla oli joko valmista toimintaa tai some tilejä.
- Ensin tilastot olivat sekavaa, sitten pyysin tapahtumat välisivun, mutta tapahtumat päätyivät tilastosivulle ja vanha reitti ohjaa sinne.
- Draftin “budjetti”, jolla ei voisi aina varata parasta pelaajaa, jätettiin tekemättä. Nykyinen draft on selkeämpi pienelle porukalle.

### Sisältö

Tekoäly kirjoitti luonnoksia etusivuun, peliohjeisiin, palvelukuvaukseen, tietosuojaan, käyttöehtoihin ja evästeisiin. Tekstit on käyty läpi ja muokattu:

- “Waiver” vaihdettiin koko palvelussa muotoon “vapaiden pelaajien markkina”.
- Beta-maininnat ja epävarmana pidetty puolustajien blokkitilasto poistettiin, jotta ohjeet eivät lupaa tilastoa jota ei haluta näyttää.
- Etusivun esittelyteksti muokattiin itse: liigan perustaminen, kutsu, draft, treidit ja nostot samassa pelissä.
- README on esittely, ei asennusohje. Se kuvaa oikeat ominaisuudet, ei keksittyä blogia.

### Koodi

Tekoälyä käytettiin komponenttien pohjiin (kortit, navigaatio, kaukalonäkymä), virheiden etsintään ja julkaisuohjeisiin. Valmista koodia ei jätetty sellaisenaan, jos se näytti väärältä puhelimessa, rikkoi pisteet tai tuntui keskeneräiseltä.

### Tarkistus

Pyysin tekoälyä etsimään syitä, kun pisteet olivat nollassa, otteluohjelma näytti väärän päivän ja päivityspainike epäonnistui. Pyysin myös selittämään, riittääkö pelkkä frontendin siirto vai pitääkö palvelin käynnistää uudelleen.

Saavutettavuutta käsiteltiin käytännön kautta: fonttikoot eri laitteilla, selkeä “Ohjeet”-painike mobiiliheaderissa, näppäimistöllä ja ruudunlukijalla nimetyt navigaatiot (`aria-label` päänavigaatiossa, alatunnisteessa ja liigan navigoinnissa).

---

## 4. AI-loki

Jokaisessa kohdassa: mitä kysyin, mitä sain, mitä muutin ja miksi. Promptit on tiivistetty.

### 1. Suunnittelu — koko palvelu

**Prompt:** Tee kirjautuminen, liigan (“kimpan”) luonti, draft ja pelipäivät samaan sovellukseen. Tee myös backend. Esimerkkityyli on vain esimerkki: tee ulkoasusta houkutteleva.

**Vastaus:** Ehdotus React-käyttöliittymästä ja Express-palvelimesta, sekä draftin, liigan ja pelipäivän näkymät.

**Muutos:** Rakenne pidettiin. Tyyliä ei hyväksytty kerralla. Sitä hiottiin myöhemmissä kierroksissa, koska ensimmäinen versio näytti sekavalta.

### 2. Suunnittelu — jääkiekon visuaalinen kieli

**Prompt:** Uudista teema jääkiekkoon. Pisteytys osioihin (kenttä, puolustaja, maalivahti).

**Vastaus:** Värit, oletuspisteet ja lomakkeen osiot.

**Muutos:** Pisteytys jäi liigakohtaiseksi. Myöhemmin puolustajien blokit poistettiin, koska tilasto ei ollut tarpeeksi varma tuotantoon.

### 3. Sisältö — nimen selkeys

**Prompt:** Vaihda “snake-draft” pelkäksi “Draft” koko projektissa (myös ohjesivut).

**Vastaus:** Tekstikorjaukset jokaiselle sivulle.

**Muutos:** Hyväksyin. draft kerrotaan peliohjeissa, ei joka napissa. Myöhemmin koko brändi vaihtui GM-Maestroksi.

### 4. Suunnittelu — julkinen etusivu ja lakisivut

**Prompt:** Ensin landing-sivu, josta idean näkee ilman kirjautumista. Headeriin Kirjaudu ja Luo tili. Mukana tietosuojaseloste, käyttöehdot ja muu, mitä tuotanto vaatii.

**Vastaus:** Julkinen kuori, etusivu, tietosuoja, käyttöehdot, evästeet ja palvelukuvaus.

**Muutos:** Sivut otettiin käyttöön. Tekstit eivät ole pelkkää tekoälyn lakijargonia: ne kuvaavat tämän palvelun (NHL-tilastot, tili, ilmainen käyttö, tukisähköposti). Juridinen lopputarkistus on silti oma vastuuni, ei tekoälyn.

### 5. Sisältö — beta pois

**Prompt:** Poista kaikki beta-viittaukset. Poista puolustajien blokit pisteytyksestä ja ohjeista. Kirjautumissivulle vain lomake ja kuva.

**Vastaus:** Teksti- ja sääntömuutokset läpi sovelluksen.

**Muutos:** Hyväksyin. Tuotteen piti näyttää valmiilta, ei harjoitukselta.

### 6. Sisältö — oma esittelylause

**Prompt:** Korjaa esittelyteksti muotoon, jossa perustetaan liiga, kutsutaan kaverit ja samassa pelissä ovat draft, treidit ja nostot. Tee mobiilin Ohjeet-painikkeesta selkeä. Korjaa otsikko, joka jäi headerin alle.

**Vastaus:** Uusi teksti ja header-korjaus.

**Muutos:** Lause on oma. Tekoälyn aiempi hero-teksti oli geneerisempi. Otsikon ja headerin päällekkäisyys löytyi itse puhelimella.

### 7. Koodi — etusivun selkeys

**Prompt:** Ensimmäinen käynnistys näyttää sekavalta. Tee käytöstä helpompaa. Asettele etusivun kortit fiksummin työpöydällä.

**Vastaus:** Korttiruudukko ja selkeämpi hierarkia.

**Muutos:** Kortit hyväksyttiin. Kaukalon hero-kuva piti pyytää takaisin, koska uudistus oli poistanut sen.

### 8. Koodi — liigan navigaatio

**Prompt:** Tee liiganäkymästä selkeämpi. Toimisiko sivupalkki?

**Vastaus:** Dashboard: sivupalkki, tilamerkki, alanavigaatio mobiilissa.

**Muutos:** Rakenne jäi. Myöhemmin Draft-välilehti piilotetaan kauden alettua. Varausjärjestys aukeaa historiasta, jotta kausinäkymä ei täyty draftin painikkeista.

### 9. Koodi — rosterin pelaajakortit

**Prompt:** Poista rosterista hankala taustakuva. Tee pelaajakorteista selkeät. Poista ohjetekstit korttien ympäriltä. Tarkista ohjelma-välilehti, ettei teksti karkaa ruudulta.

**Vastaus:** Uusi korttiasettelu ilman isoa taustakuvaa.

**Muutos:** Halusin silti jään korttien taakse. Kokeiltiin omaa `ice.png`-kuvaa. Kortit palautettiin läpikuultaviksi, erottuvuus reunalla ja kevyellä gradientilla. Mobiilin vaihtopenkki aseteltiin uudelleen, koska kortit olivat vasemmassa reunassa ja sivua piti scrollata liikaa. Nämä korjaukset tulivat omasta kokeilusta, eivät ensimmäisestä vastauksesta.

### 10. Koodi — pisteiden erittely

**Prompt:** Pelaajakortin voi avata. Näytä, mistä pisteet kertyvät. Valinta: viimeisin kierros tai koko kausi.

**Vastaus:** Modaali ja erittely.

**Muutos:** Ominaisuus pidettiin. Se auttaa tarkistamaan, ettei pistelasku ole “musta laatikko”.

### 11. Koodi — sarjataulukko

**Prompt:** Sarjataulukko on liian pieni laatikko. Tee siitä päänäkymä. Poista pienet G / A / NHL / nostot -infot.

**Vastaus:** Iso taulukko tilastosivun yläosaan.

**Muutos:** Hyväksyin. Pienet lisätilastot häiritsivät. Fantasy-sijoitus on se, mitä liigassa katsotaan.

### 12. Tarkistus — pisteet ja päivämäärä

**Prompt:** Pisteitä ei kerry, vaikka kierroksia on pelattu. Otteluohjelma näyttää pelin edelliselle päivälle. Jos peli on ensi yönä, se näkyy tämän päivän listassa.

**Vastaus:** Selitys aikaerosta (NHL-päivä vs. Suomen päivä) ja korjausehdotus hakulogiikkaan.

**Muutos:** Päivämääräkorjaus piti paikkansa ja otteluohjelma meni oikein. Pisteet eivät silti päivittyneet. Jouduin kysymään uudelleen ja vertaamaan yksittäisiä pelaajia. Yksi korjaus nollasi jo kertyneitä pisteitä toisilta. Opin, ettei tekoälyn “korjasin pistehaun” riitä: tulos pitää katsoa oikeasta pelistä.

### 13. Tarkistus — aamusynkka

**Prompt:** Voiko tilastot päivittyä automaattisesti Suomen aikaa aamulla, kun kierroksen viimeinen peli on pelattu?

**Vastaus:** Ajastettu haku aamulla, ei vain käsin painikkeesta.

**Muutos:** Automaatio jäi. “Päivitä tilastot” -painike tuntui harjoitusprojektilta ja epäonnistui usein ennen kuin onnistui. Painikkeen roolia pienennettiin, koska käyttäjän ei pidä korjata tilastoja käsin.

### 14. Tarkistus — treidiehdotus

**Prompt:** Näkyykö treidiehdotus sille managerille, jolle sitä tarjotaan?

**Vastaus:** Tarkistus ilmoituspolusta.

**Muutos:** Pelkkä kahdenvälinen ilmoitus ei riittänyt. Halusin, että koko liiga näkee ehdotukset ja nostot. Siksi rakennettiin tapahtumaosio. Se elää nyt tilastosivulla.

### 15. Suunnittelu — draftin tasapaino

**Prompt:** Suunnittele, miten draftissa ei aina voisi valita vain parasta jäljellä olevaa pelaajaa. Älä kopioi toisen pelin palkkakattoa. Älä toteuta vielä.

**Vastaus:** Useita malleja (budjetti, arvonta, rajatut poolit).

**Muutos:** Hylkäsin toteutuksen. Pienessä liigassa lisäsääntö tekisi pelistä sekavan, ja arpa ratkaisisi liikaa. Nykyinen draft saa jäädä. Tämä oli tietoinen päätös olla kopioimatta sekä tekoälyn ideaa että toista peliä.

### 16. Sisältö ja säännöt — treidi 2 vastaan 1

**Prompt:** Voiko tarjota kahta pelaajaa yhtä vastaan ilman, että rosteri kasvaa ja tyhjä paikka täytetään ilmaiseksi vapaista?

**Vastaus:** Ehdotus katto- ja minimirosterista.

**Muutos:** Muutin säännön itse: katto on 12, mutta 2 vastaan 1 vaatii että rosteri voi käydä hetken 13:ssa, muuten ensimmäistä tällaista treidiä ei voi tehdä. Markkina ei kasvata rosteria. Nosto on aina yksi sisään ja yksi ulos. Tyhjä paikka täyttyy treidillä, ei ilmaisella nostolla.

### 17. Sisältö — kieli

**Prompt:** Vaihda “Waiver-nostot” muotoon “Vapaiden pelaajien markkina” liigasivulla ja ohjeissa.

**Vastaus:** Termi päivitettiin käyttöliittymään ja ohjeisiin.

**Muutos:** Hyväksyin. Englanninkielinen waiver ei kuulu tämän kohderyhmän kieleen.

### 18. Tarkistus — julkaisu ja välimuisti

**Prompt:** Riittääkö kehityskomento ja `dist`-kansion siirto? Kun julkaisen uuden version, pitääkö jokaisen käyttäjän tehdä selaimessa kova päivitys? En halua sovellukseen erillistä “päivitä”-painiketta.

**Vastaus:** Tuotantoon kuuluu build, ei pelkkä dev-palvelin. Staattiset tiedostot kannattaa tarjoilla niin, että `index.html` ei jää vanhaan välimuistiin. Palvelimen uudelleenkäynnistys tarvitaan, kun backend muuttuu.

**Muutos:** Julkaisutavan tarkistin itse siirron jälkeen. Jos liigasivu näytti vanhaa kaukaloa ja jäi lataamaan, kyse oli vanhasta bundlesta tai välimuistista, ei siitä että koodi olisi kadonnut. Palvelimen osoitteita ja konfiguraatiota en kirjaa tähän tehtävään.

### 19. Koodi — asenna sovellus

**Prompt:** Asenna-painikkeen pitää avata selaimen oma asennusikkuna, ei vain ohjetta.

**Vastaus:** PWA:n `beforeinstallprompt`-käsittely työpöytäselaimelle ja erillinen ohje iOS-Safarille, jossa selain ei anna sivuston avata samaa ikkunaa.

**Muutos:** Hyväksyin jaon. iOS ei voi näyttää samaa ikkunaa. Ohje siellä on oikea ratkaisu, ei rikki oleva nappi.

### 20. Tarkistus — tuotantolista

**Prompt:** Arvioi matka tuotantoon. Tarvitaan sähköpostivahvistus, tietokannan varmuuskopion järkevyys ja varmuus siitä, että tilastot ovat oikein. Peli on tarkoitus julkaista ensin ilmaisena.

**Vastaus:** Etenemisluettelo: vahvistusviesti, varmuuskopio, tilastosynkka, lakisivut.

**Muutos:** Listaa käytin työjonona. Ilmaisuus ja “ei maksukorttia” näkyvät etusivulla. Maksuja ei ole kytketty. Tietosuojasivua päivitin myöhemmin uudelleen, kun kerättävät tiedot olivat selvillä. Tekoäly ei saa keksiä puuttuvia rekisterinpitäjän tietoja.

---

## 5. Tekoälyn turvallinen ja eettinen käyttö

Näitä ei syötetty tehtävää varten, eikä niitä kuulu antaa tekoälylle:

- salasanoja, sähköpostivahvistuslinkkejä tai tietokannan käyttäjätietoja
- ympäristömuuttujia ja salaisuuksia
- toisten opiskelijoiden töitä

Omia pelitilanteita (ketkä pelaajat olivat kentällä) käytin bugien raportointiin. Ne ovat julkisia NHL-pelaajia, eivät luokan henkilötietoja. Jatkossa riittää kuvata tilanne ilman omaa rosteria.

Lakitekstit on merkitty palvelun omiksi sivuiksi. Niitä ei esitetä juristin laatimina. Tekoäly luonnosteli, minä sovitin ne tähän tuotteeseen.

Toisen pelin palkkakattomallia ei kopioitu, vaikka tekoäly tarjosi sen kaltaisia vaihtoehtoja.

---

## 6. Itsearviointi

### Mitä opin

Opin jakamaan todella ison projektin pyynnöiksi: ensin rakenne, sitten näkymät yksi kerrallaan, sitten bugien korjausta ja sitä jatkui pitkään. “Tee koko UI uusiksi” tuotti näyttävän sivun, mutta vasta seuraavat promptit tekivät siitä oman ja mieleisen näköisen.

Opin lukemaan vastausta kriittisesti. Pistehaun “korjaus” saattoi nollata toisen pelaajan pisteet. Otteluohjelman päivä korjaantui eri syystä kuin pisteet. Molemmat piti tarkistaa erikseen oikealla NHL-kierroksella. Kun pelaajan treidasin toiseen joukkueeseen, sen siihen mennessä kerätyt pisteet siirtyivät mukana toiselle joukkueelle joka hajoissi logiikan, jouduin korjaamaan.

Opin myös, että tekoäly selittää julkaisun (build, staattiset tiedostot, palvelimen uudelleenkäynnistys), mutta näkee tuotannon tilan vasta kun kerron mitä palvelimella tapahtui.
Opin myös, että kun kirjoittaa agents.md tiedoston juurikansioon, voi määrittää että jokaisen muutokset jälkeen saa automaattisesti palvelimelle vienti ohjeet, viimeisimmän muutoksen mukaan tarvittavat.

### Mikä oli vaikeaa

Vaikeinta oli fantasy-pisteiden ja pelipäivän yhteys. NHL:n peliyö ja Suomen aamu menivät helposti ristiin. Sitä ei ratkaissut yksi prompti.

Toinen vaikea kohta oli ulkoasu. Geneerinen siisti teema ja “maailman hienoin dashboard” ovat eri asioita. Jouduin hylkäämään ratkaisuja, jotka näyttivät hyvältä kuvassa mutta olivat huonoja puhelimessa.

Kolmas oli sääntöjen suunnittelu (2 vastaan 1 -treidi). Tekoäly ehdotti siistiä kattoa. Se olisi estänyt juuri sen treidin, jota halusin, eli että pelaajat voivat ehdottaa kahden pelaajan vaihtoa yhteen, jolloin rosterin koko muuttuu pelaajilla. Sääntö piti ajatella itse loppuun.

### Miten tekoäly auttoi

Tekoäly nopeutti kaikkea ja viimeisteli sen mitä en olisi osannut, sekä opetti palvelimen käyttöä. reitit, kortit, navigaatio, lakisivujen runko, bugien etsinnän lähtökohdat ja julkaisun muistilista. Se ei korvannut päätöksiä siitä, mikä peli on, kenelle se on ja mikä teksti tai sääntö jää.

Hyödyllisin työskentelytapa oli lyhyt kierto: pyydä, kokeile selaimessa ja puhelimessa, kerro mikä on pielessä, pyydä korjaus. Huonoin tapa olisi ollut hyväksyä ensimmäinen kokonainen sivusto omaksi työksi.

---

## 7. Palautuksen sisältö

1. **Sivusto** — tämä GM-Maestro-projekti (julkaistu osoite `https://gm-maestro.fi`).
2. **AI-loki** — luku 4.
3. **Projektikuvaus** — luku 1 (kohderyhmä, rakenne, teknologia).
4. **Tekoälyn käyttö** — luvut 3 ja 5.
5. **Itsearviointi** — luku 6.

Laitan vielä mukaan projektin README tiedoston, sekä voin näyttää koodia tarvittaessa vaikka muistitikulta, koska en ole laittanut tätä projektia githubiin (versionhallinta on tullut periaatteessa palvelimella: kehitän koodia windowsissa, vien toimivan muutoksen palvelimelle).
