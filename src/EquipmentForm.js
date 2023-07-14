/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { useState } from 'react';
import imgIcon from './img/icon.png';
import imgHint from './img/hint.png';

const EquipmentForm = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [equipmentType, setEquipmentType] = useState('weapon');
  const [equipmentLevel, setEquipmentLevel] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [starForce, setStarForce] = useState(0);
  const [scrollQuantity, setScrollQuantity] = useState(0);
  const [addAttack, setAddAttack] = useState(0);
  const [baseAttack, setBaseAttack] = useState(0);
  const [hasAllStats, setHasAllStats] = useState(false);
  const [hasBothAttack, setHasBothAttack] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEquipmentTypeChange = (event) => {
    setEquipmentType(event.target.value);
  };

  const handleEquipmentLevelChange = (event) => {
    setEquipmentLevel(event.target.value);
  };

  const handleEquipmentNameChange = (event) => {
    setEquipmentName(event.target.value);
  };

  const handlestarChange = (event) => {
    setStarForce(parseInt(event.target.value));
  };

  const handleScrollQuantityChange = (event) => {
    setScrollQuantity(parseInt(event.target.value));
  };

  const handleaddAttackChange = (event) => {
    setAddAttack(parseInt(event.target.value));
  };

  const handleBaseAttackChange = (event) => {
    setBaseAttack(parseInt(event.target.value));
  };

  const handleHasAllStatsChange = () => {
    setHasAllStats(!hasAllStats);
  };

  const handleHasBothAttackChange = () => {
    setHasBothAttack(!hasBothAttack);
  };

  const calculateTotalAttack = () => {
    let totalAttack, atk = addAttack, star = starForce, average, iconScroll, text, error = false, result
    if (equipmentType === 'weapon' && equipmentName === '武器') { // 武器
      switch (parseInt(equipmentLevel)) {
        case 200:
          switch (star) {
            case 25: atk-=36
            case 24: atk-=35
            case 23: atk-=34
            case 22: atk-=17
            case 21: atk-=16
            case 20: atk-=15
            case 19: atk-=14
            case 18: atk-=14
            case 17: atk-=13
            case 16: atk-=13
          }
          break;
        case 160:
          switch (star) {
            case 25: atk-=34
            case 24: atk-=33
            case 23: atk-=32
            case 22: atk-=14
            case 21: atk-=13
            case 20: atk-=12
            case 19: atk-=11
            case 18: atk-=10
            case 17: atk-=9
            case 16: atk-=9
          }
          break;
        case 150:
          switch (star) {
            case 25: atk-=33
            case 24: atk-=32
            case 23: atk-=31
            case 22: atk-=13
            case 21: atk-=12
            case 20: atk-=11
            case 19: atk-=10
            case 18: atk-=9
            case 17: atk-=9
            case 16: atk-=8
          }
          break;
      }
      totalAttack = baseAttack + atk
      star = (star < 16) ? star : 15
      for (let s = 0; s < star; s++) {
        var lessAttack = Math.floor(totalAttack/50)+1
        if (Math.floor((totalAttack-lessAttack)/50)+1 === lessAttack)
          totalAttack -= Math.floor(totalAttack/50)+1
        else totalAttack -= Math.floor(totalAttack/50)
      }
      atk = totalAttack-baseAttack
    }
    else {
      var starAttack = (star < 16) ? 0 : star-15
      switch (parseInt(equipmentLevel)) { // 心臟 : 防具飾品
        case 250: atk-=starAttack*2
        case 200: atk-=starAttack*2
        case 170: case 160: atk-=starAttack
        case 155: case 150: atk-=starAttack
        case 140:
          switch (star) {
            case 25: atk-=21
            case 24: atk-=19
            case 23: atk-=17
            case 22: atk-=15
            case 21: atk-=13
            case 20: atk-=12
            case 19: atk-=11
            case 18: atk-=10
            case 17: atk-=9
            case 16: atk-=8
          }
          if (equipmentName.includes('手套')) {
            if (star >= 15) atk--
            if (star >= 14) atk--
            if (star >= 13) atk--
            if (star >= 11) atk--
            if (star >= 9) atk--
            if (star >= 7) atk--
            if (star >= 5) atk--
          }
          break;
        case 135: 
          switch (star) {
            case 25: case 24: case 23:
            case 22: case 21: case 20: atk-=11
            case 19: atk-=10
            case 18: atk-=9
            case 17: atk-=8
            case 16: atk-=7
          }
          break;
      }
    }
    average = atk/scrollQuantity
    if (equipmentType === 'weapon') average-=5
    switch (average) {
      case 9: text = '全Ｂ卷'; break
      case 8: text = '全Ｖ卷'; break
      case 7: text = '全Ｘ卷'; break
      case 5: text = '全Ｒ卷'; break
      case 4:
        if (equipmentType === 'weapon') 
        text = (equipmentName === '武器') ? (hasAllStats) ? '全極電卷' : '全咒文 15%' : '全極電卷';
        else text = (hasBothAttack) ? '全高培卷' : '全極電卷'; break
      case 2: text = '全咒文 30%'; break
      case 0: text = '全咒文 70%'; break
      default:
        if (average > 9) text = (average < 10) ? '榮耀／命運' : '榮耀／命運／救世'
        else if (average > 8) text = '可能為Ｖ卷以上混衝'
        else if (average > 7) text = '可能為Ｘ卷以上混衝'
        else if (average > 5) text = '可能為Ｒ卷以上混衝'
        else if (average > 4) 
          if (equipmentType === 'weapon') text = (equipmentName === '武器') ? (hasAllStats) ? '可能為極電卷以上混衝' : '可能為咒文 15% 以上混衝' : '可能為極電卷以上混衝'
          else text = (hasBothAttack) ? '可能為高培卷以上混衝' : '可能為極電卷以上混衝'
        else if (isNaN(average)) text = '請輸入值開始計算'
        else text = '也許是咒文或其他'
    }
    if (average > 15) error = true
    if (equipmentType === 'weapon') average+=5
    if (average < 0) error = true
    if (error) text = '請檢查輸入是否正確'
    result = '均攻：' + parseFloat(average.toFixed(2)) + '，' + text + '。'
    if (result.includes('咒文')) iconScroll = '咒文的痕跡'
    else if (result.includes('培')) iconScroll = '培羅德高級卷軸'
    else if (result.includes('極')) iconScroll = '極電卷軸'
    else if (result.includes('Ｒ')) iconScroll = 'Ｒ卷軸'
    else if (result.includes('Ｘ')) iconScroll = 'Ｘ卷軸'
    else if (result.includes('Ｖ')) iconScroll = 'Ｖ卷軸'
    else if (result.includes('Ｂ')) iconScroll = '究極的黑暗卷軸'
    else if (result.includes('救世')) iconScroll = '救世卷軸'
    else if (result.includes('命運')) iconScroll = '命運卷軸'
    else iconScroll = '？'
    return <><img src={"https://hiteku.github.io/img/ms/icon/" + iconScroll + ".png"} alt=""/>{result}</>
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form-field">
          <label className="label">裝備類型</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="weapon"
                checked={equipmentType === 'weapon'}
                onChange={handleEquipmentTypeChange}
              />
              武器／心臟
            </label>
            <label>
              <input
                type="radio"
                value="armor"
                checked={equipmentType === 'armor'}
                onChange={handleEquipmentTypeChange}
              />
              防具／飾品
            </label>
          </div>
        </div>
        <div className="form-field">
          <label className="label">裝備等級</label>
          <select value={equipmentLevel} onChange={handleEquipmentLevelChange}>
            <option value="">請選擇</option>
            {equipmentType === 'weapon' && (
              <>
                <option value="150">150</option>
                <option value="160">160</option>
                <option value="200">200</option>
              </>
            )}
            {equipmentType === 'armor' && (
              <>
                <option value="135">135</option>
                <option value="140">140</option>
                <option value="150">150</option>
                <option value="155">155</option>
                <option value="160">160</option>
                <option value="170">170</option>
                <option value="200">200</option>
                <option value="250">250</option>
              </>
            )}
          </select>
        </div>
        <div className="form-add">
          <label className="label">裝備名稱</label>
          <select value={equipmentName} onChange={handleEquipmentNameChange}>
            <option value="">請選擇</option>
            {equipmentType === 'weapon' && equipmentLevel === '150' && (
              <>
                <option value="女武神之心">女武神之心</option>
                <option value="武器">武器</option>
              </>
            )}
            {equipmentType === 'weapon' && equipmentLevel === '160' && (
              <>
                <option value="Mday">M-Day機器心臟</option>
                <option value="武器">武器</option>
              </>
            )}
            {equipmentType === 'weapon' && equipmentLevel === '200' && (
              <option value="武器">武器</option>
            )}
            {equipmentType === 'armor' && equipmentLevel === '135' && (
              <>
                <option value="紫翼護肩">紫翼護肩</option>
                <option value="紫翼戒指">紫翼戒指</option>
                <option value="紫翼耳環">紫翼耳環</option>
              </>
            )}
            {equipmentType === 'armor' && equipmentLevel === '140' && (
              <>
                <option value="混沌皇后的皇冠">混沌皇后的皇冠</option>
                <option value="混沌比艾樂帽">混沌比艾樂帽</option>
                <option value="混沌斑斑頭盔">混沌斑斑頭盔</option>
                <option value="混沌貝倫的頭盔">混沌貝倫的頭盔</option>
              </>
            )}
            {equipmentType === 'armor' && equipmentLevel === '150' && (
              <>
                <option value="天上的氣息">天上的氣息</option>
                <option value="頂級培羅德戒指">頂級培羅德戒指</option>
                <option value="頂級培羅德耳環">頂級培羅德耳環</option>
                <option value="頂級培羅德烙印墜飾">頂級培羅德烙印墜飾</option>
                <option value="頂級培羅德烙印腰帶">頂級培羅德烙印腰帶</option>
                <option value="深淵帽">深淵帽</option>
                <option value="深淵上衣">深淵上衣</option>
                <option value="深淵褲子">深淵褲子</option>
              </>
            )}
            {equipmentType === 'armor' && equipmentLevel === '155' && (
              <option value="魔性的戒指">魔性的戒指</option>
            )}
            {equipmentType === 'armor' && equipmentLevel === '160' && (
              <>
                <option value="苦痛的根源">苦痛的根源</option>
                <option value="口紅控制器標誌">口紅控制器標誌</option>
                <option value="附有魔力的眼罩">附有魔力的眼罩</option>
                <option value="波賽頓紋身">波賽頓紋身</option>
                <option value="波賽頓眼鏡">波賽頓眼鏡</option>
                <option value="強力的魔性戒指">強力的魔性戒指</option>
                <option value="航海師帽">航海師帽</option>
                <option value="航海師護肩">航海師護肩</option>
                <option value="航海師斗篷">航海師斗篷</option>
                <option value="航海師套裝">航海師套裝</option>
                <option value="航海師手套">航海師手套</option>
                <option value="航海師鞋">航海師鞋</option>
              </>
            )}
            {equipmentType === 'armor' && equipmentLevel === '170' && (
              <option value="滅龍騎士盔甲">滅龍騎士盔甲</option>
            )}
            {equipmentType === 'armor' && equipmentLevel === '200' && (
              <>
                <option value="巨大的恐怖">巨大的恐怖</option>
                <option value="指揮官力量耳環">指揮官力量耳環</option>
                <option value="神秘冥界幽靈帽">神秘冥界幽靈帽</option>
                <option value="神秘冥界幽靈護肩">神秘冥界幽靈護肩</option>
                <option value="神秘冥界幽靈斗篷">神秘冥界幽靈斗篷</option>
                <option value="神秘冥界幽靈套裝">神秘冥界幽靈套裝</option>
                <option value="神秘冥界幽靈手套">神秘冥界幽靈手套</option>
                <option value="神秘冥界幽靈鞋子">神秘冥界幽靈鞋子</option>
              </>
            )}
            {equipmentType === 'armor' && equipmentLevel === '250' && (
              <>
                <option value="永恆帽">永恆帽</option>
                <option value="永恆上衣">永恆上衣</option>
                <option value="永恆褲子">永恆褲子</option>
              </>
            )}
          </select>
        </div>
        {equipmentType === 'weapon' && equipmentName === '武器' && (
          <>
            <div className="form-add" id="bold">
              白字攻擊力 <input
                type="number"
                min="0"
                max="999"
                value={baseAttack}
                onChange={handleBaseAttackChange}
              />
            </div>
            <div className="form-add">
              <input
                type="checkbox"
                checked={hasAllStats}
                onChange={handleHasAllStatsChange}
              />全屬性皆有藍字
            </div>
          </>
        )}
        {equipmentType === 'armor' && equipmentLevel === '150' && equipmentName.includes('培羅德') && (
          <div className="form-add">
            <input
              type="checkbox"
              checked={hasBothAttack}
              onChange={handleHasBothAttackChange}
            />物魔攻皆有藍字
          </div>
        )}
        <div className="form-field">
          <div className="form-config">
            星力 <input
              type="number"
              min="0"
              max="25"
              value={starForce}
              onChange={handlestarChange}
            />
          </div>
          <div className="form-config">
            卷數 <input
              type="number"
              min="0"
              max="25"
              value={scrollQuantity}
              onChange={handleScrollQuantityChange}
            />
          </div>
          <div className="form-config" id="addAtk">
            藍字攻擊力 <input
              type="number"
              min="0"
              max="999"
              value={addAttack}
              onChange={handleaddAttackChange}
              style={{width: "60px"}}
            />
          </div>
          <div className="image-container">
            <img
              src={imgIcon}
              alt="Equipment"
              style={{width: "20px"}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isHovered && (
              <img
                src={imgHint}
                alt="Equipment"
                id="hint"
              />
            )}
          </div>
        </div>
      </div>
      <div className="form-footer">
        <div className="result">
          {calculateTotalAttack()}
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;
