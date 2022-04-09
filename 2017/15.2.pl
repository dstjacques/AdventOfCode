

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

my $a = 618; # 618
my $b = 814; # 814
my $aFactor = 16807;
my $bFactor = 48271;
my $divisor = 2147483647;
my $numBits = 16;
my $num = (2**$numBits) - 1;
my $pairs = 0;
my @aValues;
my @bValues;
for 1..40000000 {
    if ($_ % 100000 == 0) {
        print $_ ~ "\n";
    }
    $a = ($a * $aFactor) % $divisor;
    $b = ($b * $bFactor) % $divisor;
    
    if ($a % 4 == 0) {
        @aValues.push($a);
    }
    if ($b % 8 == 0) {
        @bValues.push($b);
    }
}

my $end = @aValues.elems-1;
if (@bValues.elems < @aValues.elems) {
    $end = @bValues.elems-1;
}
for 0..$end {
    my $aRightBits = @aValues[$_] +& $num;
    my $bRightBits = @bValues[$_] +& $num;
    if ($aRightBits == $bRightBits) {
        $pairs++;
    }
}
print $pairs ~ "\n";
