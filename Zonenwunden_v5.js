main();
async function main() {

function dmgRoll(dmgResult){
	dmgDice = "d6";
	dmgRoll = new Roll(dmgDice).roll({async:true})
	dmgRoll.then(roll =>{
dmgResult = roll.total;}})

		woundChangesBreast = [
			{
				key: "data.base.combatAttributes.active.baseAttack.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.combatAttributes.active.baseParry.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.basicAttributes.constitution.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.basicAttributes.strength.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				//additional Damage
				key: " data.base.resources.vitality.value",
				value: - dmgResult,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
		];
			
		woundChangesBelly = [
			{
				key: "data.base.combatAttributes.active.baseAttack.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.combatAttributes.active.baseParry.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.basicAttributes.constitution.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.basicAttributes.strength.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.movement.speed.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.combatAttributes.active.baseInitiative.value",
				value: - 1,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				//additional Damage
				key: " data.base.resources.vitality.value",
				value: - dmgResult,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
		];
	});			
}

function dmgRoll(INIResult){
	INIDice = "2d6";			
	INIRoll = new Roll(INIDice).roll({async:true})
	INIRoll.then(roll =>{
		INIResult = roll.total;		
 
		woundChangesHead = [
			{
				key: "data.base.basicAttributes.courage.value",
				value: - 2,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.basicAttributes.cleverness.value",
				value: - 2,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.basicAttributes.intuition.value",
				value: - 2,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				key: "data.base.combatAttributes.active.baseInitiative.value",
				value: - 2,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
			{
				//additional INI loss
				key: "data.base.combatAttributes.active.initiative.value",
				value: - INIResult,
				mode: CONST.ACTIVE_EFFECT_MODES.ADD,
			},
		];
	});
}

const woundChangesSwordArm = [
	{
		key: "data.base.combatAttributes.active.baseAttack.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.combatAttributes.active.baseParry.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.basicAttributes.strength.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.basicAttributes.dexterity.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	];

const woundChangesShieldArm = [
	{
		key: "data.base.basicAttributes.strength.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.basicAttributes.dexterity.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
];

const woundChangesLeftLeg = [
	{
		key: "data.base.combatAttributes.active.baseAttack.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.combatAttributes.active.baseParry.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.basicAttributes.agility.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.combatAttributes.active.baseInitiative.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
];

const woundChangesRightLeg = [
	{
		key: "data.base.combatAttributes.active.baseAttack.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.combatAttributes.active.baseParry.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.basicAttributes.agility.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
	{
		key: "data.base.combatAttributes.active.baseInitiative.value",
		value: - 2,
		mode: CONST.ACTIVE_EFFECT_MODES.ADD,
	},
];

const effectData1 = {
  label: "Kopf",
  icon: "icons/svg/blood.svg",
  changes: woundChangesHead,
  flags:
  {
	core:
	{
		statusId: "woundA",
    },
  },
};

const effectData2 = {
	label: "Brust",
    icon: "icons/svg/blood.svg",
    changes: woundChangesBreast,
    flags:
	{
		core:
		{
			statusId: "woundB",
		},
    },
};

const effectData3 = {
	label: "Bauch",
    icon: "icons/svg/blood.svg",
    changes: woundChangesBelly,
    flags:
	{
		core:
		{
			statusId: "woundC",
		},
    },
};
  
const effectData4 = {
	label: "Schwertarm",
	icon: "icons/svg/blood.svg",
	changes: woundChangesSwordArm,
	flags:
	{
		core:
		{
			statusId: "woundD",
		},
    },
};
  
const effectData5 = {
    label: "Shildarm",
    icon: "icons/svg/blood.svg",
    changes: woundChangesShieldArm,
    flags:
	{
		core:
		{
			statusId: "woundE",
		},
    },
};
  
const effectData6 = {
    label: "Linkes Bein",
    icon: "icons/svg/blood.svg",
    changes: woundChangesLeftLeg,
    flags:
	{
		core:
		{
			statusId: "woundF",
		},
    },
};
  
const effectData7 = {
    label: "Rechtes Bein",
    icon: "icons/svg/blood.svg",
    changes: woundChangesRightLeg,
    flags:
	{
		core:
		{
			statusId: "woundG",
		},
    },
};

const woundsData = {
    woundA: effectData1,
    woundB: effectData2,
	woundC: effectData3,
	woundD: effectData4,
	woundE: effectData5,
	woundF: effectData6,
	woundG: effectData7
}

function addWound(token, woundId){
    const effectData = woundsData[woundId]
    if(effectData){
        return token.actor.createEmbeddedDocuments("ActiveEffect", [effectData])
	}
}

function removeWound(token, woundId){
    const woundEffect = token.actor.effects.find((wound) => wound.getFlag('core', 'statusId') === woundId)
    if(woundEffect){
		return woundEffect.delete()
    }
}

const tokens = game.canvas.tokens.controlled;
tokens.map((token) => {
    new Dialog(
        {
            title: 'Choose wound',
            content: '',
            buttons:{
				addWoundA:
					{
					label: '+ Kopf <img src="icons/svg/blood.svg">',
					callback: () => addWound(token, 'woundA'),
					},
				removeWoundA:
					{
					label: '- Kopf <img src="icons/svg/pill.svg">',
					callback: () => removeWound(token, 'woundA'),
					},
				addWoundB:
					{
					label: '+ Brust <img src="icons/svg/blood.svg">',
					callback: () => addWound(token, 'woundB'),
					},
				removeWoundB:
					{
					label: '- Brust <img src="icons/svg/pill.svg">',
					callback: () => removeWound(token, 'woundB'),
					},
				addWoundC:
					{
					label: '+ Bauch <img src="icons/svg/blood.svg">',
					callback: () => addWound(token, 'woundC'),
					},
				removeWoundC:
					{
					label: '- Bauch <img src="icons/svg/pill.svg">',
					callback: () => removeWound(token, 'woundC'),
					},
				addWoundD:
					{
					label: '+ Schwertarm <img src="icons/svg/blood.svg">',
					callback: () => addWound(token, 'woundD'),
					},
				removeWoundD:
					{
					label: '- Schwertarm <img src="icons/svg/pill.svg">',
					callback: () => removeWound(token, 'woundD'),
					},
				addWoundE:
					{
					label: '+ Schildarm <img src="icons/svg/blood.svg">',
					callback: () => addWound(token, 'woundE'),
					},
				removeWoundE:
					{
					label: '- Schildarm <img src="icons/svg/pill.svg">',
					callback: () => removeWound(token, 'woundE'),
					},
				addWoundF:
					{
					label: '+ Linkes Bein <img src="icons/svg/blood.svg">',
					callback: () => addWound(token, 'woundF'),
					},
				removeWoundF:
					{
					label: '- Linkes Bein <img src="icons/svg/pill.svg">',
					callback: () => removeWound(token, 'woundF'),
					},
				addWoundG:
					{
					label: '+ Rechtes Bein <img src="icons/svg/blood.svg">',
					callback: () => addWound(token, 'woundG'),
					},
				removeWoundG:
					{
					label: '- Rechtes Bein <img src="icons/svg/pill.svg">',
					callback: () => removeWound(token, 'woundG'),
					},
            },
        }
    ).render(true)
}
}