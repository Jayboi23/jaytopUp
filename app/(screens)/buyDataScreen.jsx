import { View, Text,TextInput } from 'react-native'
import React,{useEffect, useState} from 'react'
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/CustomButton"
import CustomModal from "../../components/CustomModal";
import { fetchNetworkList } from "../../APIs/networkList";
import { fetchDataPlans } from '../../APIs/getDataPlans';
import { buyData, postBuyData } from '../../APIs/buyData';

// const MTN_PlanTypes = [
//   { key: "1", value: "GIFTING" },
//   { key: "2", value: "SME" },
//   { key: "3", value: "SME2" },
//   { key: "4", value: "CORPORATE GIFTING" },
//   { key: "5", value: "DATA COUPONS" },
//   { key: "6", value: "AWOOF DATA" },
// ];

export default function buyDataScreen() {
  const [selected, setSelected] = useState("");
  const [planSelected, setPlanSelected] = useState("");
    const [openModal, setOpenModal] = useState(false);
      const [networkLists, setNetworkLists] = useState({});
      const [dataPlans, setDataPlans] = useState({});
      const [phone, setPhone] = useState("");

  
    const handleOpenModal =  () =>{
      setOpenModal(!openModal)

    } 

    const newPlans = Object.keys(dataPlans).flatMap((network) =>
      dataPlans[network].map((plan) => ({
          key: plan.id,
          value: `${plan.plan_network} - ${plan.plan} - ${plan.plan_type} - ${plan.month_validate} - ₦${plan.plan_amount}0`
      }))
  );

      const filteredNewPlans = selected ? newPlans.filter((item) => item.value.includes(selected)) : {}
      
      const getPlanId = planSelected ? filteredNewPlans.filter((item) => item.value === planSelected) : null

      const plan_id = getPlanId ? getPlanId[0].key : null


    const getNetworkID = selected ? networkLists.filter((item) => item.value === selected) : null

    const network_id = getNetworkID ? getNetworkID[0].key : null


    const handleBuyData = () => {
      postBuyData(network_id, phone, plan_id)
    }
  
    const handleCloseModal =  () =>{
      setOpenModal(!openModal)
    } 

     useEffect(() => {
       const fetchNetworks = async () => {
         const networks = await fetchNetworkList();
         const networksfiltered = networks.filter(
           (item) => item.value !== "SMILE"
         );
         setNetworkLists(networksfiltered);
       };

       const fetchPlans = async () =>{
          const plans = await fetchDataPlans();
          setDataPlans(plans)
       }
          fetchNetworks();
         fetchPlans()
     }, []);        



  return (
    <View className="px-3 bg-white flex-1">
    
    <View className="mt-5 mb-2">
      <SelectList
        setSelected={(val) => setSelected(val)}
        placeholder="Choose Network"
        fontFamily="Rubik"
        data={networkLists}
        save="value"
      />
    </View>

    <View className="mb-5">
      <SelectList
        setSelected={(val) => setPlanSelected(val)}
        placeholder="Choose Data Plan"
        fontFamily="Rubik"
        data={filteredNewPlans}
        save="value"
      />
    </View>

    <TextInput placeholder="Reciepient's Phone Number" placeholderTextColor="lightgray" onChangeText={(text) => setPhone(text)} className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"/>

    <TextInput placeholder="Amount to pay" placeholderTextColor="lightgray" value={`₦${planSelected ? planSelected.split('₦')[1] : 0}`} editable = {false} className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"/>

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

    {openModal && (<CustomModal
          modalType="buyData"
          closeModal={handleCloseModal}
          />)}

  </View>
  )
}