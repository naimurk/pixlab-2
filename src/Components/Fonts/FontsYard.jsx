import React from 'react';
import { useAppContext } from "../../context";

const FontsYard = ({
  item,
  content,
  setcontent,
  undoRedoFunc,
  index,
  setshowPremiumModal,
}) => {
  const context = useAppContext();
  const { planType } = context.sharedState;

  const handleChange = (e) => {
    const selectedFont = e.target.value;

    if (
      selectedFont !== 'Inter' &&
      selectedFont !== 'Roboto' &&
      planType !== "starter" &&
      planType !== "lifetime" &&
      setshowPremiumModal
    ) {
      return setshowPremiumModal(true);
    }

    const newArr = [...content];
    newArr[index] = { ...item, fontFamily: selectedFont };
    undoRedoFunc();
    setcontent(newArr);
  };

  return (
    <select
      value={item.fontFamily}
      onChange={handleChange}
      name="category"
      className="outline-none bg-white dark:bg-gray-800 mx-2 px-2 py-1 border border-gray-600 rounded-2xl text-sm"
    >
      <option className="font-inter" value="Inter">
        Inter
      </option>
      <option className="font-roboto" value="Roboto">
        Roboto
      </option>
      <option className="font-lato" value="Lato">
        Lato
      </option>
      <option className="font-montserrat" value="Montserrat">
        Montserrat
      </option>
      <option className="font-oswald" value="Oswald">
        Oswald
      </option>
      <option className="font-slabo27px" value="Slabo 27px">
        Slabo 27px
      </option>
      <option className="font-raleway" value="Raleway">
        Raleway
      </option>
      <option className="font-ptSans" value="PT Sans">
        PT Sans
      </option>
      <option className="font-nunito" value="Nunito">
        Nunito
      </option>
      <option className="font-merriweather" value="Merriweather">
        Merriweather
      </option>
      <option className="font-poppins" value="Poppins">
        Poppins
      </option>
      <option className="font-playfairDisplay" value="Playfair Display">
        Playfair Display
      </option>
      <option className="font-mulish" value="Mulish">
        Mulish
      </option>
      <option className="font-firaSans" value="Fira Sans">
        Fira Sans
      </option>
      <option className="font-inconsolata" value="Inconsolata">
        Inconsolata
      </option>
      <option className="font-karla" value="Karla">
        Karla
      </option>
      <option className="font-libreBaskerville" value="Libre Baskerville">
        Libre Baskerville
      </option>
      <option className="font-quicksand" value="Quicksand">
        Quicksand
      </option>
      <option className="font-lora" value="Lora">
        Lora
      </option>
      <option className="font-ptSerif" value="PT Serif">
        PT Serif
      </option>
      <option className="font-ubuntu" value="Ubuntu">
        Ubuntu
      </option>
      <option className="font-vollkorn" value="Vollkorn">
        Vollkorn
      </option>
      <option className="font-oldStandardTT" value="Old Standard TT">
        Old Standard TT
      </option>
      <option className="font-dosis" value="Dosis">
        Dosis
      </option>
      <option className="font-hind" value="Hind">
        Hind
      </option>
      <option className="font-josefinSans" value="Josefin Sans">
        Josefin Sans
      </option>
      <option className="font-fjallaOne" value="Fjalla One">
        Fjalla One
      </option>
      <option className="font-notoSans" value="Noto Sans">
        Noto Sans
      </option>
      <option className="font-crimsonText" value="Crimson Text">
        Crimson Text
      </option>
      <option className="font-dancingScript" value="Dancing Script">
        Dancing Script
      </option>
      <option className="font-lobster" value="Lobster">
        Lobster
      </option>
    </select>
  );
};

export default FontsYard;
