param (
    [Parameter(Mandatory=$true)][string]$year,
    [Parameter(Mandatory=$true)][string]$day
)

$day = $day.PadLeft(2, '0')

$yearNum = [int]$year;
if ($yearNum -lt 2020 -or $yearNum -gt 2050) {
    throw "Invalid year ''$year''"
}
$dayNum = [int]$day;
if ($dayNum -lt 1 -or $dayNum -gt 31) {
    throw "Invalid day ''$day''"
}

$target = "$year\day$day"

md $year | Out-Null
md $target | Out-Null

$suffixes = @(".language", "_example.txt", "_example_run.ps1", "_input.txt", "_input_run.ps1")

$parts = 2
for ($i = 1; $i -le $parts; $i++) {
    $prefix = "day{0}_part{1}" -f $day, $i
    for ($j = 0; $j -lt $suffixes.length; $j++) {
        $filename = $prefix + $suffixes[$j]
        ni "$target\$filename" | Out-Null
    }
}

$shortcut = @"
[{{000214A0-0000-0000-C000-000000000046}}]
Prop3=19,11
[InternetShortcut]
IDList=
URL=https://adventofcode.com/{0}/day/{1}
"@ -f $year, $day

$shortcut | Out-File $("$target\{0} Day {1}.url" -f $year, $day)