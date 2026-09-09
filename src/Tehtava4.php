<?php

class opiskelija {
    public string $nimi;
    public string $ryhma;

    public function esittele() {
        echo "Nimeni on " . $this->nimi . " ja opiskelen ryhmässä " . $this->ryhma . "<br>";
    }
}

$seppo = new opiskelija();
$seppo->nimi = "Seppo";
$seppo->ryhma = "Ohjelmistokehittäjä";


$matti = new opiskelija();
$matti->nimi = "Matti";
$matti->ryhma = "Ohjelmistokehittäjä";


$seppo->esittele();
$matti->esittele();