

sub gcd($num1, $num2) {
    my $a = $num1;
    my $b = $num2;
    while $b != 0 {
        my $t = $b;
        $b = $a % $b;
        $a = $t;
    }
    return $a;
}

my $a = 618;
my $b = 814;
my $aFactor = 16807;
my $bFactor = 48271;
my $divisor = 2147483647;
my $numBits = 16;
my $num = (2**$numBits) - 1;
my $pairs = 0;
for 1..40000000 {
    if ($_ % 100000 == 0) {
        print $_ ~ "\n";
    }
    $a = ($a * $aFactor) % $divisor;
    $b = ($b * $bFactor) % $divisor;
    
    my $aRightBits = $a +& $num;
    my $bRightBits = $b +& $num;
    if ($aRightBits == $bRightBits) {
        $pairs++;
    }
}
print $pairs ~ "\n";
