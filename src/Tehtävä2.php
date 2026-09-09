<?php  
class Auto
{
    public string $merkki;
    public string $malli;

}

$Auto1 = new Auto();

$Auto1->merkki = "Ford";
$Auto1->malli = "Focus";

echo "Auto on " . $Auto1->merkki . "<br>" . "Merkki on " . $Auto1->malli;

?>