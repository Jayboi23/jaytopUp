import { View, Text, TextInput, Pressable, Keyboard, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import { fetchNetworkList } from "../../APIs/networkList";
import { fetchDataPlans } from "../../APIs/getDataPlans";
import Entypo from "@expo/vector-icons/Entypo";
import { Marquee } from "@animatereactnative/marquee";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// const MTN_PlanTypes = [
//   { key: "1", value: "GIFTING" },
//   { key: "2", value: "SME" },
//   { key: "3", value: "SME2" },
//   { key: "4", value: "CORPORATE GIFTING" },
//   { key: "5", value: "DATA COUPONS" },
//   { key: "6", value: "AWOOF DATA" },
// ];

const GLO_PREFIX = ["0805", "0807", "0705", "0811", "0815", "0905", "0915"]
const MTN_PREFIX = ["0803", "0703", "0903", "0806", "0706", "0813", "0810", "0814", "0816", "0903", "0906", "0913"]
const AIRTEL_PREFIX = ["0802", "0808", "0708", "0701", "0812", "0901", "0902", "0904", "0907", "0912" ]
const ETISALAT_PREFIX = ["0809", "0817", "0818", "0908", "0909" ]

export default function buyDataScreen() {
  const [selected, setSelected] = useState("");
  const [planSelected, setPlanSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [networkLists, setNetworkLists] = useState({});
  const [dataPlans, setDataPlans] = useState({});
  const [phone, setPhone] = useState("");
   const [error1, setError1] = useState("")
    const [error2, setError2] = useState("")
    const [error3, setError3] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleErrorTimeOut = () =>{
    setTimeout(()=>{
      setError1("")
      setError2("")
      setError3("")
    },3000)
  }

  const prefixCheck = () => {
    const prefix = phone.slice(0,4)
    if (selected === "GLO") {
      if (GLO_PREFIX.includes(prefix)){
        setError3("")
      }else {
        setError3("Not a GLO number")
        handleErrorTimeOut()
        return;
      }
     
    } else if (selected === "MTN") {
    if (MTN_PREFIX.includes(prefix)){
      setError3("")
    }else {
      setError3("Not a MTN number")
      handleErrorTimeOut()
      return;
    }
  }else if (selected === "AIRTEL") {
    if (AIRTEL_PREFIX.includes(prefix)){
      setError3("")
    }else {
      setError3("Not a AIRTEL number")
      handleErrorTimeOut()
      return;
    }
  }else if (selected === "9MOBILE") {
    if (ETISALAT_PREFIX.includes(prefix)){
      setError3("")
    }else {
      setError3("Not a 9MOBILE number");
      handleErrorTimeOut();
      return;
    }
  }
  handleOpenModal()
}

  const handleFieldsCheck = () =>{
    if (!selected){
      setError1("Please choose a network")
      handleErrorTimeOut()
      return;
    } else if (!planSelected) {
      setError2("Please choose a data plan");
      handleErrorTimeOut()
      return;
    }else if (!phone) {
      setError3("Enter the reciepient number ")
      handleErrorTimeOut()
      return;
    }else if (phone.length !== 11){
      setError3("Please enter a valid phone number");
      handleErrorTimeOut();
      return;
    }
    prefixCheck();
  }

  const newPlans = dataPlans ? Object.keys(dataPlans).flatMap((network) =>
    dataPlans[network].map((plan) => ({
      key: plan.id,
      value: `${plan.plan_network} - ${plan.plan} - ${plan.plan_type} - ${plan.month_validate} - ₦${plan.plan_amount}0`,
    }))
  ): null;

  const filteredNewPlans = selected ? newPlans.filter((item) => item.value.includes(selected)) : {};

  const getPlanId = planSelected
    ? filteredNewPlans.filter((item) => item.value === planSelected)
    : null;

  const plan_id = planSelected ? getPlanId[0].key : null;
 
  const getNetworkID = selected
    ? networkLists.filter((item) => item.value === selected)
    : null;

  const network_id = getNetworkID ? getNetworkID[0].key : null;

  const handleBuyData = () => {
    handleFieldsCheck();
  };

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };
  
  const planSize = planSelected.split("-")[1]
  const planAmount =  planSelected.split("₦")[1]
  const planValidity =  planSelected.split("-")[3]
  const planType =  planSelected.split("-")[2]


  useEffect(() => {
    const fetchNetworks = async () => {
    setIsLoading(true)
      const networks = await fetchNetworkList();
      const networksfiltered = networks.filter(
        (item) => item.value !== "SMILE"
      );
      setNetworkLists(networksfiltered);
      setIsLoading(false)
    };

    const fetchPlans = async () => {
      const plans = await fetchDataPlans();
      setDataPlans(plans);
    };
    fetchNetworks();
    fetchPlans();
  }, []);

  const handleNetworkFieldSelected = (val) => {
    setSelected(val)
    setPlanSelected("")
  }

  if (isLoading){
    return <View className="flex-1 justify-center items-center bg-white"><ActivityIndicator size="small"/></View>
  }

  return (
    <GestureHandlerRootView>
      <Pressable onPress={Keyboard.dismiss} className="px-3 bg-white flex-1">
       
        {/* Annoucement section */}
        <View className="mt-5 mb-5 flex-row gap-x-2 border border-bgButton p-3 items-center rounded-xl">
          <Entypo name="info-with-circle" size={24} color="#dbdbfe" />
          <Marquee
            style={{ width: "90%", overflow: "hidden" }}
            spacing={50}
            speed={1}
            withGesture={false}
          >
            <Text className="font-rMedium text-base">
              MTN network is currently down!!!
            </Text>
          </Marquee>
        </View>

        <View className="mb-3">
          <SelectList
            setSelected={handleNetworkFieldSelected}
            placeholder="Choose Network"
            fontFamily="Rubik"
            data={networkLists}
            boxStyles={{borderColor: error1 ? "red" : "black" }}
            save="value"
          />
          {error1 && (<Text className="mt-2 text-red-500 text-base font-rRegular">{error1}</Text>)}
        </View>

        <View className="mb-3">
          <SelectList
            setSelected={(val) => setPlanSelected(val)}
            placeholder="Choose Data Plan"
            fontFamily="Rubik"
            data={filteredNewPlans}
            boxStyles={{borderColor: error2 ? "red" : "black" }}
            save="value"
          />
          {error2 && <Text className="text-red-500 text-base mt-2 font-rRegular">{error2}</Text>}
        </View>

        <TextInput
          placeholder="Reciepient's Phone Number"
          placeholderTextColor="lightgray"
          onChangeText={(text) => setPhone(text)}
          className={`bg-transparent border ${error3 ? "border-red-500 text-red-500" : " border-black/50 text-black"} w-full h-14 px-3 rounded-xl mb-3`}
        />
        {error3 && <Text className="text-red-500 text-base font-rRegular -mt-2 mb-2">{error3}</Text>}

        <TextInput
          placeholder="Amount to pay"
          placeholderTextColor="lightgray"
          value={`₦${planSelected ? planSelected.split("₦")[1] : 0}`}
          editable={false}
          className="bg-transparent font-rMedium border border-black/50 w-full h-14 px-3 rounded-xl mb-5"
        />

        <Button
          title="Buy"
          containerStyle="bg-primary w-full self-center h-14"
          textStyles="text-white"
          handlePress={handleBuyData}
        />

        <View className="self-center items-center justify-center bottom-12 absolute">
          <Text className="font-rBold text-xl text-primary">JayTopUp</Text>
          <Text className="font-rMedium text-base text-gray-500">1.0.0</Text>
        </View>

        {openModal && (
          <CustomModal modalType="buyData" closeModal={handleCloseModal} plan_id={plan_id} planAmount={planAmount} planSize={planSize} planValidity={planValidity} planType={planType} network_id={network_id} network={selected} phone={phone}/>
        )}
      </Pressable>
    </GestureHandlerRootView>
  );
}
