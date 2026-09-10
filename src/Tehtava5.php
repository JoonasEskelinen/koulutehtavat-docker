<?php
class kirja{

public string $nimi;
public string $kirjailija;
public int $sivumaara;
}

$kirja = new kirja();
$kirja->nimi = "Potterin Harri";
$kirja->kirjailija = "Rowlingin Jokke";
$kirja->sivumaara = 222;

echo "Kirjan nimi on " . $kirja->nimi . ", Kirjan on kirjoittanut " . $kirja->kirjailija . ", ja kirjassa on sivuja " . $kirja->sivumaara;
?>