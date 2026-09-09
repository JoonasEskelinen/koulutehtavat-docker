<?php

class opiskelija {
    public string $nimi;
    public string $ryhma;
}

 $seppo = new opiskelija();
 $seppo->nimi = "Seppo";
 $seppo->ryhma = "Ohjelmistokehittäjä";
 
 $matti = new opiskelija();
 $matti->nimi = "Matti";
 $matti->ryhma = "Ohjelmistokehittäjä";

 echo "Opiskelija1: " . $seppo->nimi . ", " . $seppo->ryhma . "<br>";
 echo "Opiskelija2: " . $matti->nimi . ", " . $matti->ryhma;