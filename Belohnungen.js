// Skript für die Belohnung von Spielern


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

//###############################################################################################################################################################################################################################################

	//Name des gewählten Helden
		const tokenName = token.actor.name;

	//Abenteuerpunkte
		const XP = token.actor.system.base.appearance.weight;	
	
	//Sozialstatus
		const Sozialstatus = token.actor.system.base.social.social_status.value;																													//Astralenergie		AE

	//Münzen
		const Wealth = token.actor.system.base.appearance.height;	
		WealthDukaten = Math.floor(Wealth/1000);
		WealthSilber = Math.floor((Wealth/100) - (WealthDukaten*10));
		WealthHeller = Math.floor((Wealth/10) - (WealthSilber*10) - (WealthDukaten*100));
		WealthKreuzer = Math.floor(Wealth/1 - (WealthHeller*10) - (WealthSilber*100) - (WealthDukaten*1000));
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

	headerDialog = "<h2>Belohnungen</h2>";
	inputDialog = headerDialog;
	inputDialog += divFlexStart + `
			<label for="checkPay">Gewinn (check) oder Verlust (uncheck)?</label><input type="checkbox" id="checkPay" name="checkPay" style="float:right">
		`+ divFlexEnd + hr;
	inputDialog += divFlexStart + "Abenteuerpunkte: <input id='inputXP'" + divInputNumber + "0'/>" + divFlexEnd + hr; 
	inputDialog += divFlexStart + "Sozialstatus: <input id='inputSocial'" + divInputNumber + "0'/>" + divFlexEnd + hr; 
	inputDialog += divFlexStart + "Dukaten: <input id='inputDukaten'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + "Silber: <input id='inputSilber'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + "Heller: <input id='inputHeller'" + divInputNumber  + "0'/>" + divFlexEnd;
	inputDialog += divFlexStart + "Kreuzer: <input id='inputKreuzer'" + divInputNumber  + "0'/>" + divFlexEnd + hr;
	inputDialog += "<u>aktuelle Werte: </u><br>";
	inputDialog += "<b>" + XP + "</b> Abenteuerpunkte<br>";
	inputDialog += "Sozialstatus: <b>" + Sozialstatus + "</b><br><br>";
	inputDialog += "<u>aktuelles Vermögen: </u><br>";
	if(WealthDukaten === 1){
		inputDialog += "<b>" + WealthDukaten + "</b> Dukate<br>";
	}else{
		inputDialog += "<b>" + WealthDukaten + "</b> Dukaten<br>";
	}
	inputDialog += "<b>" + WealthSilber + "</b> Silber<br>";
	inputDialog += "<b>" + WealthHeller + "</b> Heller<br>";
	inputDialog += "<b>" + WealthKreuzer + "</b> Kreuzer";


//###############################################################################################################################################################################################################################################    

    new Dialog({
        title: "Belohnungen",
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
        render: () => console.log(),
        close: () => console.log()
    }).render(true);
    
    async function htmlCallback(html){
 
		const checkPayInput = html.find("#checkPay")[0].checked;
				Pay = (checkPayInput === true)? -1 : 1;
		const inputSocialValue = Number(html.find("#inputSocial")[0]?.value || 0);
		const inputXPValue = Number(html.find("#inputXP")[0]?.value || 0);
		const inputDukatenValue = Number(html.find("#inputDukaten")[0]?.value || 0);		
		const inputSilberValue = Number(html.find("#inputSilber")[0]?.value || 0);
		const inputHellerValue = Number(html.find("#inputHeller")[0]?.value || 0);
		const inputKreuzerValue = Number(html.find("#inputKreuzer")[0]?.value || 0);
		
		Value = inputKreuzerValue + 10*inputHellerValue + 100*inputSilberValue + 1000*inputDukatenValue;
		
		if((Pay === -1) && (Value > Wealth)){
			ui.notifications.error("Das kannst du dir nicht leisten.");
			return;
		}

		//Umrechnung in Dukaten, Silber, Heller:
		ValueDukaten = Math.floor(Value/1000);
		ValueSilber = Math.floor((Value/100) - (ValueDukaten*10));
		ValueHeller = Math.floor((Value/10) - (ValueSilber*10) - (ValueDukaten*100));
		ValueKreuzer = Math.floor(Value/1 - (ValueHeller*10) - (ValueSilber*100) - (ValueDukaten*1000));

		if(Pay === -1){
			newSO = Sozialstatus - inputSocialValue;
			newXP = XP - inputXPValue;
			newMoney = Wealth - Value;
			newDukaten = Math.floor(newMoney/1000);
			newSilber = Math.floor((newMoney/100) - (newDukaten*10));
			newHeller = Math.floor((newMoney/10) - (newSilber*10) - (newDukaten*100));
			newKreuzer = Math.floor(newMoney/1 - (newHeller*10) - (newSilber*100) - (newDukaten*1000));
		}else{
			newSO = Sozialstatus + inputSocialValue;
			newXP = XP + inputXPValue;
			newMoney = Wealth + Value;
			newDukaten = Math.floor(newMoney/1000);
			newSilber = Math.floor((newMoney/100) - (newDukaten*10));
			newHeller = Math.floor((newMoney/10) - (newSilber*10) - (newDukaten*100));
			newKreuzer = Math.floor(newMoney/1 - (newHeller*10) - (newSilber*100) - (newDukaten*1000));
		}
			
        flavor = "Belohnungen<br>";
		if(Pay === -1){
			flavor += "<b>" + tokenName + "</b> verliert: <br>";
		}else{
			flavor += "<b>" + tokenName + "</b> bekommt: <br>";
		}
		if(newSO != Sozialstatus){
			flavor += "Neuer SO: <b>" + newSO + "</b><br>";
		}if(newXP != XP){
			flavor += "<b>" + inputXPValue + "</b> Abenteuerpunkte<br>";
		}
		if(ValueDukaten > 0){
			if(ValueDukaten === 1){
				flavor += "<b>" + ValueDukaten + "</b> Dukate<br>";
			}else{
				flavor += "<b>" + ValueDukaten + "</b> Dukaten<br>";
			}
		}if(ValueSilber > 0){
			flavor += "<b>" + ValueSilber + "</b> Silber<br>";
		}if(ValueHeller > 0){
			flavor += "<b>" + ValueHeller + "</b> Heller<br>";
		}if(ValueKreuzer > 0){
			flavor += "<b>" + ValueKreuzer + "</b> Kreuzer<br>";
		}
		            
		ChatMessage.create({
			flavor: flavor, 
			user: game.user._id,
			blind: true,
			whisper: game.users.filter(u => u.isGM).map(u => u.id)
		});
        updating(newMoney, newSO, newXP)
	};

    function updating(newMoney, newSO, newXP){
       
		MoneyUpdate = newMoney
		XPupdate = newXP
		SOupdate = newSO

		token.actor.update({
			'system.base.appearance.height': MoneyUpdate,
			'system.base.appearance.weight': XPupdate,
			'system.base.social.social_status.value': SOupdate,
		});
	}
}
