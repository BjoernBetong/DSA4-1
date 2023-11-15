// Skript für den Zonenschaden


main();
async function main() {

    //Überprüfe, ob ein Held ausgewählt wurde
    if (canvas.tokens.controlled.length === 0 || canvas.tokens.controlled.length > 1) {
        ui.notifications.error("Bitte einen Helden auswählen.");
        return;
    };
    if (game.user.targets.size > 1) {
        ui.notifications.error("Bitte nur einen Helden anvisieren.");
        return;
    };
    
	//gewählter Held
    if(game.user.targets.size === 1){
        targetActor = game.user.targets.values().next().value.actor;
        targetName = targetActor.name;
    }else{
        targetActor = "";
        targetName = "";
	};

	
	//Abrufen des hinterlegten Würfelsystems
    const rollMode = game.settings.get('core', 'rollMode');


//###############################################################################################################################################################################################################################################

	//Name des gewählten Helden
		const tokenName = token.actor.name;

	//Eigenschaften des Helden	
		const courage = token.actor.system.base.basicAttributes.courage.value;																														//Mut				MU
		const cleverness = token.actor.system.base.basicAttributes.cleverness.value;																												//Klugheit			KL
		const intuition = token.actor.system.base.basicAttributes.intuition.value;																													//Intuition			IN
		const charisma = token.actor.system.base.basicAttributes.charisma.value;																													//Charisma			CH
		const dexterity = token.actor.system.base.basicAttributes.dexterity.value;																													//Fingerfertigkeit	FF
		const agility = token.actor.system.base.basicAttributes.agility.value;																														//Gewandheit		GE
		const constitution = token.actor.system.base.basicAttributes.constitution.value;																											//Konstitution		KO
		const strength = token.actor.system.base.basicAttributes.strength.value;																													//Körperkraft		KK
		const magicResistance = token.actor.system.base.combatAttributes.passive.magicResistance.value; 																							//Magieresistenz	MR
		const astralEnergy = token.actor.system.base.resources.astralEnergy.value;																													//Astralenergie		AE
		const lepValue = token.actor.system.base.resources.vitality.value;
		const iniValue = token.actor.system.base.combatAttributes.active.baseInitiative.value;
		const lepMax = token.actor.system.base.resources.vitality.max;
		const aupValue = token.actor.system.base.resources.endurance.value;
		const aupMax = token.actor.system.base.resources.endurance.max;

	//Talente des Helden
		const eisern = (token.actor.items.find(item => item.name === "Eisern") === undefined)? 0: 2;
		const zah = (token.actor.items.find(item => item.name === "Zäher Hund") === undefined)? 0: 1;
		const glasknochen = (token.actor.items.find(item => item.name === "Glasknochen")=== undefined)? 0: -2;
		const ws1 = Math.ceil(constitution / 2) + eisern + glasknochen;
		const ws2 = Math.ceil(constitution) + eisern + glasknochen;
		const ws3 = Math.ceil(constitution * 1.5) + eisern + glasknochen;

//###############################################################################################################################################################################################################################################

    //allgemeine Dialogoptionen
		const hr = "<hr>";
		const divFlexStart = "<div style='display:flex'><span style='flex:1'>";
		const divFlexEnd = "</span></div>";
		const divInputNumber = "type='number' style='width:50px;float:right' value='";
		const divInputBox = "type='checkbox' style='width:70px;float:right' ";
		const divInputUnchecked = "/>";
		const divInputChecked = "checked />";
	
//###############################################################################################################################################################################################################################################    

    headerDialog = "<h2><i>" + tokenName + "</i><br>erhält Schaden</h2>";
	inputDialog = headerDialog;
    inputDialog += divFlexStart + "Schaden: <input id='hitValue'" + divInputNumber  + "0'/>" + divFlexEnd;
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="type">Schadensart</label>
                 <select name="type" id="type" style="float:right">
                    <option value="0">TP</option>
                    <option value="1">SP</option>
                 </select>
            </form>
        `+ divFlexEnd;
    inputDialog += divFlexStart + `
            <form action"#">
                 <label for="typeAd">LeP/AuP-Schaden</label>
                 <select name="typeAd" id="typeAd" style="float:right">
                    <option value="0">LeP</option>
                    <option value="1">AuP+LeP/2</option>
                    <option value="2">AuP</option>
                 </select>
            </form>
        `+ divFlexEnd + hr;
	inputDialog += "<b>Rüstung</b>";
	inputDialog += divFlexStart +  `
            <form action"#">
                 <label for="typeHelmet">Kopfbedeckung</label>
                 <select name="typeHelmet" id="typeHelmet" style="float:right">
                    <option value="0">-----------keine Kopfbedeckung-----------</option>
					<option value="99">-------Tuch-, Filz oder Fellrüstung--------</option>
                    <option value="12">Wattierte Kappe</option>
					<option value="99">---------------Lederrüstung-----------------</option>
                    <option value="1">Lederhelm</option>
 					<option value="2">Lederhelm, verstärkt</option>
 					<option value="99">----Ketten- und Schuppenrüstungen----</option>
					<option value="3">Kettenhaube</option>
					<option value="14">Kettenhaube mit Gesichtsschutz</option>
					<option value="99">--------------------Helme--------------------</option>
					<option value="4">Barburiner Hut</option>
					<option value="5">Drachenhelm</option>
					<option value="6">Morion</option>
					<option value="7">Schaller</option>
					<option value="8">Stechhelm/Visierhelm</option>
					<option value="9">Sturmhaube</option>
					<option value="10">Tellerhelm</option>
 					<option value="11">Topfhelm</option>
            </select>
            </form>
        `+ divFlexEnd;
	inputDialog += divFlexStart +  `
            <form action"#">
                 <label for="typeArmor">Rüstung</label>
                 <select name="typeArmor" id="typeArmor" style="float:right">
                    <option value="0">----------------keine Rüstung---------------</option>
					<option value="99">-------------------Kleidung-------------------</option>
                    <option value="1">Dicke Kleidung</option>
                    <option value="2">Lederweste/Pelzweste</option>
                    <option value="3">Anaurak</option>
					<option value="99">-------Tuch-, Filz oder Fellrüstung--------</option>
                    <option value="4">Gambeson</option>
                    <option value="5">Mattenrücken</option>
                    <option value="6">Tuchrüstung</option>
					<option value="99">----------------Lederrüstung-----------------</option>
                    <option value="7">Brustplatte</option>
 					<option value="8">Iryanrüstung</option>
 					<option value="9">Krötenhaut</option>
 					<option value="10">Lederharnisch</option>
 					<option value="99">-----------exotische Materialien-----------</option>
					<option value="11>Maraskanischer Hartholzharnisch</option>
					<option value="12">Mammutonpanzer</option>
 					<option value="99">----Ketten- und Schuppenrüstungen---</option>
					<option value="13">Brigantina</option>
					<option value="14">Eisenmantel</option>
					<option value="15">Fünflagenharnisch</option>
					<option value="16">Kettenweste</option>
					<option value="17">Kettenhemd, 1/2 Arm</option>
					<option value="18">langes Kettenhemd</option>
					<option value="19">Kettenmantel</option>
					<option value="20">Ringelpanzer</option>
					<option value="21">Ringmantel (Brabakmantel)</option>
					<option value="22">Schuppenpanzer</option>
					<option value="23">Schuppenpanzer, lang</option>
					<option value="24">Spiegelpanzer</option>
 					<option value="99">--------------Plattenrüstungen-------------</option>
					<option value="25">Amazonenrüstung (kpl.)</option>
					<option value="26">Bronzeharnisch</option>
					<option value="27">Garether Platte (kpl.)</option>
					<option value="28">Gestechrüstung (kpl.)</option>
					<option value="29">Horasischer Reiterharnisch (kpl.)</option>
					<option value="30">Kürass</option>
					<option value="31">Kusliker Lamellar</option>
					<option value="32">leichte Platte</option>
             </select>
            </form>
        `+ divFlexEnd;
			inputDialog += divFlexStart +  `
            <form action"#">
                 <label for="typeCoat">Umhänge</label>
                 <select name="typeCoat" id="typeCoat" style="float:right">
                    <option value="0">-----------------kein Umhang---------------</option>
                    <option value="1">Fellumhang</option>
 					<option value="2">Fuhrmannsmantel</option>
             </select>
            </form>
        `+ divFlexEnd;
	inputDialog += divFlexStart +  `
            <form action"#">
                 <label for="typeArms">Armschutz</label>
                 <select name="typeArms" id="typeArms" style="float:right">
                    <option value="0">-------------keine Armschienen------------</option>
                    <option value="1">Armschienen, Leder</option>
 					<option value="2">Armschienen, Bronze</option>
 					<option value="3">Armschienen, Stahl</option>
 					<option value="4">Plattenschulter</option>
 					<option value="5">Plattenarm</option>
             </select>
            </form>
        `+ divFlexEnd;
	inputDialog += divFlexStart +  `
            <form action"#">
                 <label for="typeLegs">Beinschutz</label>
                 <select name="typeLegs" id="typeLegs" style="float:right">
                    <option value="0">--------------kein Beinschutz---------------</option>
                    <option value="1">Lederhose</option>
                    <option value="2">Streifenschurz</option>
                    <option value="3">Beinschienen, Leder</option>
					<option value="6">Kettenbeinlinge</option>
 					<option value="4">Beinschienen, Bronze</option>
 					<option value="5">Beinschienen, Stahl</option>
					<option value="7">Panzerbein</option>
					<option value="8">Panzerschuh</option>
             </select>
            </form>
        `+ divFlexEnd + hr;
		inputDialog += divFlexStart + `
            <form action"#">
                 <label for="wound">Wundschwelle</label>
                 <select name="wound" id="wound" style="float:right">
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0" selected>±0</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                    <option value="3">+3</option>
                    <option value="4">+4</option>
                 </select>
            </form>
        `+ divFlexEnd;
   inputDialog += divFlexStart + `
            <form action"#">
                 <label for="woundAdd">Zusatzwunde durch Manöver</label>
                 <select name="woundAdd" id="woundAdd" style="float:right">
                    <option value="0" selected>±0</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                 </select>
            </form>
        `+ divFlexEnd;
   inputDialog += divFlexStart + `
            <label for="crit">Kritischer Treffer</label><input type="checkbox" id="crit" name="crit" style="float:right">
        `+ divFlexEnd;

//###############################################################################################################################################################################################################################################    

    new Dialog({
        title: "Schaden erhalten",
        content: inputDialog,
        buttons: {
            close: {
                icon: '<i class="fas fa-times"></i>', label: "Schließen"
            }, 
            accept: {
                icon: '<i class="fas fa-check"></i>', label: "Eintragen", callback: htmlCallback
            }  
        },
        default: "accept",
        render: () => console.log("Schaden erhalten wurde geöffnet"),
        close: () => console.log("Schaden erhalten wurde geschlossen")
    }).render(true);
    
    async function htmlCallback(html){
        
			const armorInput = Number(html.find("#typeArmor")[0]?.value || 0);		//Auswahl eines Wertes für das Dropdown-Menü
			const helmetInput = Number(html.find("#typeHelmet")[0]?.value || 0);
			const armsInput = Number(html.find("#typeArms")[0]?.value || 0);
			const legsInput = Number(html.find("#typeLegs")[0]?.value || 0);
			const coatInput = Number(html.find("#typeCoat")[0]?.value || 0);
			
	switch(armorInput){
		case 0: //keine Rüstung
			KoArmor = 0;
			BrArmor = 0;
			RuArmor = 0;
			BaArmor = 0;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 1: //Dicke Kleidung
			KoArmor = 0;
			BrArmor = 1;
			RuArmor = 1;
			BaArmor = 1;
			LAArmor = 1;
			RAArmor = 1;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 2: //Lederweste/Pelzweste
			KoArmor = 0;
			BrArmor = 1;
			RuArmor = 1;
			BaArmor = 1;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 3: //Anaurak
			KoArmor = 1;
			BrArmor = 1;
			RuArmor = 1;
			BaArmor = 1;
			LAArmor = 1;
			RAArmor = 1;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 4: //Gambeson
			KoArmor = 0;
			BrArmor = 2;
			RuArmor = 2;
			BaArmor = 2;
			LAArmor = 1;
			RAArmor = 1;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 5: //Mattenrücken
			KoArmor = 1;
			BrArmor = 1;
			RuArmor = 3;
			BaArmor = 0;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 6: //Tuchrüstung
			KoArmor = 0;
			BrArmor = 2;
			RuArmor = 2;
			BaArmor = 2;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 7: //Brustplatte
			KoArmor = 0;
			BrArmor = 2;
			RuArmor = 0;
			BaArmor = 1;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 8: //Iryanrüstung
			KoArmor = 0;
			BrArmor = 3;
			RuArmor = 2;
			BaArmor = 2;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 9: //Krötenhaut
			KoArmor = 0;
			BrArmor = 3;
			RuArmor = 2;
			BaArmor = 2;
			LAArmor = 1;
			RAArmor = 1;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 10: //Lederharnisch
			KoArmor = 0;
			BrArmor = 3;
			RuArmor = 3;
			BaArmor = 3;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 11: //Maraskanischer Hartholzharnisch
			KoArmor = 0;
			BrArmor = 4;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 1;
			RAArmor = 1;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 12: //Mammutonpanzer
			KoArmor = 0;
			BrArmor = 4;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 2;
			RAArmor = 2;
			LBArmor = 2;
			RBArmor = 2;
			break;
		case 13: //Brigantina
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 2;
			RAArmor = 2;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 14: //Eisenmantel
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 5;
			BaArmor = 5;
			LAArmor = 2;
			RAArmor = 2;
			LBArmor = 2;
			RBArmor = 2;
			break;
		case 15: //Fünflagenharnisch
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 5;
			BaArmor = 4;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 16: //Kettenweste
			KoArmor = 0;
			BrArmor = 4;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 17: //Kettenhemd, 1/2 Arm
			KoArmor = 0;
			BrArmor = 4;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 2;
			RAArmor = 2;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 18: //langes Kettenhemd
			KoArmor = 0;
			BrArmor = 4;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 3;
			RAArmor = 3;
			LBArmor = 2;
			RBArmor = 2;
			break;
		case 19: //Kettenmantel
			KoArmor = 0;
			BrArmor = 4;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 3;
			RAArmor = 3;
			LBArmor = 3;
			RBArmor = 3;
			break;
		case 20: //Ringelpanzer
			KoArmor = 0;
			BrArmor = 4;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 3;
			RAArmor = 3;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 21: //Ringmantel
			KoArmor = 0;
			BrArmor = 3;
			RuArmor = 3;
			BaArmor = 3;
			LAArmor = 2;
			RAArmor = 2;
			LBArmor = 2;
			RBArmor = 2;
			break;
		case 22: //Schuppenpanzer
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 5;
			BaArmor = 5;
			LAArmor = 3;
			RAArmor = 3;
			LBArmor = 3;
			RBArmor = 3;
			break;
		case 23: //Schuppenpanzer, lang
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 5;
			BaArmor = 5;
			LAArmor = 3;
			RAArmor = 3;
			LBArmor = 4;
			RBArmor = 4;
			break;
		case 24: //Spiegelpanzer
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 5;
			BaArmor = 5;
			LAArmor = 3;
			RAArmor = 3;
			LBArmor = 2;
			RBArmor = 2;
			break;
		case 25: //Amazonenrüstung
			KoArmor = 3;
			BrArmor = 5;
			RuArmor = 3;
			BaArmor = 5;
			LAArmor = 2;
			RAArmor = 2;
			LBArmor = 3;
			RBArmor = 3;
			break;
		case 26: //Bronzeharnisch
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 27: //Garether Platte
			KoArmor = 0;
			BrArmor = 6;
			RuArmor = 5;
			BaArmor = 6;
			LAArmor = 5;
			RAArmor = 5;
			LBArmor = 4;
			RBArmor = 4;
			break;
		case 28: //Gestechrüstung
			KoArmor = 8;
			BrArmor = 8;
			RuArmor = 7;
			BaArmor = 8;
			LAArmor = 7;
			RAArmor = 7;
			LBArmor = 7;
			RBArmor = 7;
			break;
		case 29: //Horasischer Reiterharnisch
			KoArmor = 3;
			BrArmor = 7;
			RuArmor = 5;
			BaArmor = 7;
			LAArmor = 5;
			RAArmor = 5;
			LBArmor = 5;
			RBArmor = 5;
			break;
		case 30: //Kürass
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 1;
			BaArmor = 2;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 0;
			RBArmor = 0;
			break;
		case 31: //Kusliker Lamellar
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 4;
			BaArmor = 4;
			LAArmor = 1;
			RAArmor = 1;
			LBArmor = 1;
			RBArmor = 1;
			break;
		case 32: //leichte Platte
			KoArmor = 0;
			BrArmor = 5;
			RuArmor = 4;
			BaArmor = 5;
			LAArmor = 0;
			RAArmor = 0;
			LBArmor = 2;
			RBArmor = 2;
			break;
	}		

	switch(helmetInput){
		case 0: //keine Kopfbedeckung
			KoHelmet = 0;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 1: //Lederhelm
			KoHelmet = 2;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 2: //Lederhelm, verstärkt
			KoHelmet = 3;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 3: //Kettenhaube
			KoHelmet = 3;
			BrHelmet = 1;
			RuHelmet = 1;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 4: //Barburiner Hut
			KoHelmet = 4;
			BrHelmet = 0;
			RuHelmet = 1;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 5: //Drachenhelm
			KoHelmet = 3;
			BrHelmet = 0;
			RuHelmet = 1;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 6: //Morion
			KoHelmet = 3;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 7: //Schaller
			KoHelmet = 4;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 8: //Stechhelm/Visierhelm
			KoHelmet = 5;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 9: //Sturmhaube
			KoHelmet = 3;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 10: //Tellerhelm
			KoHelmet = 2;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 11: //Topfhelm
			KoHelmet = 5;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 12: //Wattierte Kappe
			KoHelmet = 1;
			BrHelmet = 0;
			RuHelmet = 0;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;
		case 13: //Kettenhaube mit Gesichtsschutz
			KoHelmet = 4;
			BrHelmet = 1;
			RuHelmet = 1;
			BaHelmet = 0;
			LAHelmet = 0;
			RAHelmet = 0;
			LBHelmet = 0;
			RBHelmet = 0;
			break;	}		

	switch(armsInput){
		case 0: //keine Armschienen
			KoArms = 0;
			BrArms = 0;
			RuArms = 0;
			BaArms = 0;
			LAArms = 0;
			RAArms = 0;
			LBArms = 0;
			RBArms = 0;
			break;
		case 1: //Armschienen, Leder
			KoArms = 0;
			BrArms = 0;
			RuArms = 0;
			BaArms = 0;
			LAArms = 1;
			RAArms = 1;
			LBArms = 0;
			RBArms = 0;
			break;
		case 2: //Armschienen, Bronze
			KoArms = 0;
			BrArms = 0;
			RuArms = 0;
			BaArms = 0;
			LAArms = 2;
			RAArms = 2;
			LBArms = 0;
			RBArms = 0;
			break;
		case 3: //Armschienen, Stahl
			KoArms = 0;
			BrArms = 0;
			RuArms = 0;
			BaArms = 0;
			LAArms = 3;
			RAArms = 3;
			LBArms = 0;
			RBArms = 0;
			break;
		case 4: //Plattenschulter
			KoArms = 0;
			BrArms = 1;
			RuArms = 1;
			BaArms = 0;
			LAArms = 2;
			RAArms = 2;
			LBArms = 0;
			RBArms = 0;
			break;
		case 5: //Plattenarm
			KoArms = 0;
			BrArms = 0;
			RuArms = 0;
			BaArms = 0;
			LAArms = 5;
			RAArms = 5;
			LBArms = 0;
			RBArms = 0;
			break;
	}		

	switch(legsInput){
		case 0: //kein Beinschutz
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 0;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 0;
			RBLegs = 0;
			break;
		case 1: //Lederhose
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 1;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 1;
			RBLegs = 1;
			break;
		case 2: //Streifenschurz
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 2;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 2;
			RBLegs = 2;
			break;
		case 3: //Beinschienen, Leder
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 0;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 1;
			RBLegs = 1;
			break;
		case 4: //Beinschienen, Bronze
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 0;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 2;
			RBLegs = 2;
			break;
		case 5: //Beinschienen, Stahl
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 0;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 3;
			RBLegs = 3;
			break;
		case 6: //Kettenbeinlinge
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 0;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 4;
			RBLegs = 4;
			break;
		case 5: //Panzerbein, Stahl
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 0;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 4;
			RBLegs = 4;
			break;
		case 5: //Panzerschuh
			KoLegs = 0;
			BrLegs = 0;
			RuLegs = 0;
			BaLegs = 0;
			LALegs = 0;
			RALegs = 0;
			LBLegs = 1;
			RBLegs = 1;
			break;
	}	
	
	switch(coatInput){
		case 0: //kein Umhang
			KoCoat = 0;
			BrCoat = 0;
			RuCoat = 0;
			BaCoat = 0;
			LACoat = 0;
			RACoat = 0;
			LBCoat = 0;
			RBCoat = 0;
			break;
		case 1: //Fellumhang
			KoCoat = 0;
			BrCoat = 1;
			RuCoat = 2;
			BaCoat = 0;
			LACoat = 1;
			RACoat = 1;
			LBCoat = 1;
			RBCoat = 1;
			break;
		case 2: //Fuhrmannsmantel
			KoCoat = 0;
			BrCoat = 1;
			RuCoat = 2;
			BaCoat = 0;
			LACoat = 1;
			RACoat = 1;
			LBCoat = 1;
			RBCoat = 1;
			break;
	}	

		if(armorInput === 1){
			Ko = KoArmor + KoHelmet + BrCoat;
			Br = BrArmor + BrHelmet + BrCoat;
			Ru = RuArmor + RuHelmet + RuCoat;
			Ba = BaArmor + BaHelmet + BaCoat;
			LA = LAArmor + LAHelmet + LACoat;
			RA = RAArmor + RAHelmet + RACoat;
			LB = LBArmor + LBHelmet + LBCoat;
			RB = RBArmor + RBHelmet + RBCoat;
		}if(armorInput === 3){
			if(helmetInput > 0){
				Ko = KoArmor + BrCoat;
			}else{Ko = KoHelmet + BrCoat;
			}
			Br = BrArmor + BrHelmet + BrArms + BrLegs + BrCoat;
			Ru = RuArmor + RuHelmet + RuArms + RuLegs + RuCoat;
			Ba = BaArmor + BaHelmet + BaArms + BaLegs + BaCoat;
			LA = LAArmor + LAHelmet + LAArms + LALegs + LACoat;
			RA = RAArmor + RAHelmet + RAArms + RALegs + RACoat;
			LB = LBArmor + LBHelmet + LBArms + LBLegs + LBCoat;
			RB = RBArmor + RBHelmet + RBArms + RBLegs + RBCoat;
		}if(armorInput === 5){
			Ko = KoArmor + BrCoat;
			Br = BrArmor + BrHelmet + BrArms + BrLegs + BrCoat;
			Ru = RuArmor + RuHelmet + RuArms + RuLegs + RuCoat;
			Ba = BaArmor + BaHelmet + BaArms + BaLegs + BaCoat;
			LA = LAArmor + LAHelmet + LAArms + LALegs + LACoat;
			RA = RAArmor + RAHelmet + RAArms + RALegs + RACoat;
			LB = LBArmor + LBHelmet + LBArms + LBLegs + LBCoat;
			RB = RBArmor + RBHelmet + RBArms + RBLegs + RBCoat;
		}if(armorInput === 25){
			Ko = KoArmor + BrCoat;
			Br = BrArmor + BrCoat;
			Ru = RuArmor + RuCoat;
			Ba = BaArmor + BaCoat;
			LA = LAArmor + LACoat;
			RA = RAArmor + RACoat;
			LB = LBArmor + LBCoat;
			RB = RBArmor + RBCoat;
		}if(armorInput === 27){
			Ko = KoArmor + BrCoat;
			Br = BrArmor + BrCoat;
			Ru = RuArmor + RuCoat;
			Ba = BaArmor + BaCoat;
			LA = LAArmor + LACoat;
			RA = RAArmor + RACoat;
			LB = LBArmor + LBCoat;
			RB = RBArmor + RBCoat;
		}if(armorInput === 28){
			Ko = KoArmor + BrCoat;
			Br = BrArmor + BrCoat;
			Ru = RuArmor + RuCoat;
			Ba = BaArmor + BaCoat;
			LA = LAArmor + LACoat;
			RA = RAArmor + RACoat;
			LB = LBArmor + LBCoat;
			RB = RBArmor + RBCoat;
		}if(armorInput === 29){
			Ko = KoArmor + BrCoat;
			Br = BrArmor + BrCoat;
			Ru = RuArmor + RuCoat;
			Ba = BaArmor + BaCoat;
			LA = LAArmor + LACoat;
			RA = RAArmor + RACoat;
			LB = LBArmor + LBCoat;
			RB = RBArmor + RBCoat;
		}else{
		Ko = KoArmor + KoHelmet + KoArms + KoLegs + KoCoat;
		Br = BrArmor + BrHelmet + BrArms + BrLegs + BrCoat;
		Ru = RuArmor + RuHelmet + RuArms + RuLegs + RuCoat;
		Ba = BaArmor + BaHelmet + BaArms + BaLegs + BaCoat;
		LA = LAArmor + LAHelmet + LAArms + LALegs + LACoat;
		RA = RAArmor + RAHelmet + RAArms + RALegs + RACoat;
		LB = LBArmor + LBHelmet + LBArms + LBLegs + LBCoat;
		RB = RBArmor + RBHelmet + RBArms + RBLegs + RBCoat;
		}
	
		
		ZoneDice = "1d20";
        ZoneRoll = new Roll(ZoneDice).roll({async:true})
        ZoneRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
		addINIDice = "1d6";
        addINIRoll = new Roll(addINIDice).roll({async:true})
        addINIRoll.then(roll =>{
			let w2 = roll.total;
		adddmgDice = "d6";
        adddmgRoll = new Roll(adddmgDice).roll({async:true})
        adddmgRoll.then(roll =>{
			let w3 = roll.total;
			
			if(w1 === 1){
				Zone = LB;
				Hitzone = "Linkes Bein";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 2){
				Zone = RB;
				Hitzone = "Rechtes Bein";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 3){
				Zone = LB;
				Hitzone = "Linkes Bein";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 4){
				Zone = RB;
				Hitzone = "Rechtes Bein";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 5){
				Zone = LB;
				Hitzone = "Linkes Bein";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 6){
				Zone = RB;
				Hitzone = "Rechtes Bein";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 7){
				Zone = Ba;
				Hitzone = "Bauch";
				adddmg = w3;
				addINIloss = 0;
			}if(w1 === 8){
				Zone = Ba;
				Hitzone = "Bauch";
				adddmg = w3;
				addINIloss = 0;
			}if(w1 === 9){
				Zone = LA;
				Hitzone = "Linker Arm";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 10){
				Zone = RA;
				Hitzone = "Rechter Arm";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 11){
				Zone = LA;
				Hitzone = "Linker Arm";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 12){
				Zone = RA;
				Hitzone = "Rechter Arm";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 13){
				Zone = LA;
				Hitzone = "Linker Arm";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 14){
				Zone = RA;
				Hitzone = "Rechter Arm";
				adddmg = 0;
				addINIloss = 0;
			}if(w1 === 15){
				Zone = Br;
				Hitzone = "Brust";
				adddmg = w3;
				addINIloss = 0;
			}if(w1 === 16){
				Zone = Br;
				Hitzone = "Brust";
				adddmg = w3;
				addINIloss = 0;
			}if(w1 === 17){
				Zone = Br;
				Hitzone = "Brust";
				adddmg = w3;
				addINIloss = 0;
			}if(w1 === 18){
				Zone = Br;
				Hitzone = "Brust";
				adddmg = w3;
				addINIloss = 0;
			}if(w1 === 19){
				Zone = Ko;
				Hitzone = "Kopf";
				adddmg = 0;
				addINIloss = w2;
			}if(w1 === 20){
				Zone = Ko;
				Hitzone = "Kopf";
				adddmg = 0;
				addINIloss = w2;
			}
		

		const hitInput = Number(html.find("#hitValue")[0]?.value || 0);
        const typInput = Number(html.find("#type")[0]?.value || 0);
        const typAdInput = Number(html.find("#typeAd")[0]?.value || 0);
        const woundInput = Number(html.find("#wound")[0]?.value || 0);
        const woundAddInput = Number(html.find("#woundAdd")[0]?.value || 0);
        const critInput = html.find("#crit")[0].checked;
        
        //crit
        critDMG = (critInput === true)? hitInput * 2 : hitInput;

        //RS
        tempRes = (0 < (0 - Zone))? 0 : Zone;
        
        //TP o SP     
        dmg = (typInput === 0)? critDMG - tempRes : critDMG;     
        dmg = (dmg < 0)? 0 : dmg;
        
        //LeP o AuP
        hitInputAu = 0;
        hitInputLe = 0;
        switch(typAdInput){
          case 0: 
            hitInputLe = dmg + adddmg;
            break;
          case 1:
            hitInputLe = Math.ceil(dmg / 2) + adddmg;
            hitInputAu = dmg;
            break;
          case 2:
            hitInputAu = dmg;
            break;
        };
        
        //WS
        woundCount = 0;
        if(hitInputLe > ws1 + woundInput){
            woundCount += 1;
        };
        if(hitInputLe > ws2 + woundInput){
            woundCount += 1;
        };
        if(hitInputLe > ws3 + woundInput){
            woundCount += 1;
        };
        if(woundCount > 0){
            woundCount += woundAddInput;
            game.macros.getName("Zonenwunden").execute()
        };
        if(woundCount > 0 && critInput === true){
            woundCount += 1;  
        };
        
        aupRoll(aupValue,hitInputLe,hitInputAu,woundCount) 
    


    function aupRoll(aupValue,hitInputLe,hitInputAu,woundCount){
		aupDice = woundCount + "d6";
        aupRoll = new Roll(aupDice).roll({async:true})
        aupRoll.then(roll =>{
            aupCheck = aupValue - hitInputAu + roll.total;
            hitInputAuCheck = (aupCheck < 0)? aupValue: aupCheck;

            lepCheck = lepValue - hitInputLe;
            down = "";
            downText = "Held ist kampfunfähig.<br><br>";
            if(lepCheck < 2){
                down = downText;
                
            }else if(lepCheck < 6){
                if(!(eisern > 0 || zah > 0) ){
                    down = downText;
                };
            };
            if(aupCheck < 1){
                down = downText;
                
            };
            aupOutput = aupValue - hitInputAuCheck
            flavor = down;
			flavor += "Treffer: <b>";
			flavor += Hitzone; 
			flavor += "</b><br>Schaden erhalten:";
			flavor += "<br>LeP: " + hitInputLe;
			flavor += "<br>AuP: " +  aupOutput;
			flavor += "<br>Davon AuP-Verlust durch " + woundCount + " Wunde(n):" + hr;
			flavor += "<b>Zonenrüstung</b>:"
			if(Hitzone == "Kopf"){
				flavor += "<br>---------<b>Ko: " + Ko + "</b>---------";
				flavor += "<br>LA: " + LA + " / Br: " + Br + " / RA: " + RA;
				flavor += "<br>-----Ba: " + Ba + " / Rü: " + Ru + "----";
				flavor += "<br>-----LB: " + LB + " / RB: " + RB + "----";
			}if(Hitzone == "Linker Arm"){
				flavor += "<br>---------Ko: " + Ko + "---------";
				flavor += "<br><b>LA: " + LA + "</b> / Br: " + Br + " / RA: " + RA;
				flavor += "<br>-----Ba: " + Ba + " / Rü: " + Ru + "----";
				flavor += "<br>-----LB: " + LB + " / RB: " + RB + "----";
			}if(Hitzone == "Brust"){
				flavor += "<br>---------Ko: " + Ko + "---------";
				flavor += "<br>LA: " + LA + " / <b>Br: " + Br + "</b> / RA: " + RA;
				flavor += "<br>-----Ba: " + Ba + " / Rü: " + Ru + "----";
				flavor += "<br>-----LB: " + LB + " / RB: " + RB + "----";
			}if(Hitzone == "Rechter Arm"){
				flavor += "<br>---------Ko: " + Ko + "--------";
				flavor += "<br>LA: " + LA + " / Br: " + Br + " / <b>RA: " + RA + "</b>";
				flavor += "<br>-----Ba: " + Ba + " / Rü: " + Ru + "----";
				flavor += "<br>-----LB: " + LB + " / RB: " + RB + "----";
			}if(Hitzone == "Bauch"){
				flavor += "<br>---------Ko: " + Ko + "---------";
				flavor += "<br>LA: " + LA + " / Br: " + Br + " / RA: " + RA;
				flavor += "<br>-----<b>Ba: " + Ba + "</b> / Rü: " + Ru + "----";
				flavor += "<br>-----LB: " + LB + " / RB: " + RB + "----";
			}if(Hitzone == "Rücken"){
				flavor += "<br>---------Ko: " + Ko + "---------";
				flavor += "<br>LA: " + LA + " / Br: " + Br + " / RA: " + RA;
				flavor += "<br>-----Ba: " + Ba + " / <b>Rü: " + Ru + "</b>----";
				flavor += "<br>-----LB: " + LB + " / RB: " + RB + "----";
			}if(Hitzone == "Linkes Bein"){
				flavor += "<br>---------Ko: " + Ko + "---------";
				flavor += "<br>LA: " + LA + " / Br: " + Br + " / RA: " + RA;
				flavor += "<br>-----Ba: " + Ba + " / Rü: " + Ru + "----";
				flavor += "<br>-----<b>LB: " + LB + "</b> / RB: " + RB + "----";
			}if(Hitzone == "Rechtes Bein"){
				flavor += "<br>---------Ko: " + Ko + "---------";
				flavor += "<br>LA: " + LA + " / Br: " + Br + " / RA: " + RA;
				flavor += "<br>-----Ba: " + Ba + " / Rü: " + Ru + "----";
				flavor += "<br>-----LB: " + LB + " / <b>RB: " + RB + "</b>----";
			}			
            
			roll.toMessage({
                flavor: flavor, 
				speaker: ChatMessage.getSpeaker({token: token.document})
            });
            
            updating(hitInputLe, hitInputAuCheck)
        });
    }

    function updating(hitInputLe, hitInputAuCheck, addINIloss){
       
        lepUpdate = lepValue - hitInputLe;
        aupUpdate = hitInputAuCheck;
		iniUpdate = addINIloss;
        
        token.actor.update({
        'system.base.resources.vitality.value': lepUpdate,
        'system.base.resources.endurance.value': aupUpdate,
	'system.data.base.combatAttributes.active.baseInitiative.value': iniUpdate
        });
    }
		})})})
	}
}
