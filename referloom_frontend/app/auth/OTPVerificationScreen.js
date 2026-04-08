import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OTPVerificationScreen() {
  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://172.20.10.12:5000";
  const inputs = [useRef(), useRef(), useRef(), useRef()];

  // ------------------------------
  // SEND OTP TO BACKEND
  // ------------------------------
  const sendOtp = async () => {
    if (phone.length !== 10) {
      Alert.alert("Invalid", "Enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/otp/send-otp`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  body: JSON.stringify({ phone }),
});

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        Alert.alert("Success", "OTP sent successfully");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Network error");
    }

    setLoading(false);
  };

  // ------------------------------
  // HANDLE OTP INPUT CHANGE
  // ------------------------------
  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs[index + 1].current.focus();
    }
  };

  // ------------------------------
  // VERIFY OTP FROM BACKEND
  // ------------------------------
  const verifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 4) {
      Alert.alert("Invalid OTP", "Please enter all 4 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/otp/verify-otp`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  body: JSON.stringify({ phone, otp: code }),
});

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Verified", "OTP Verified Successfully");

        // Navigate to Role selection screen
        navigation.navigate("auth/RoleSelectScreen", {
          phone: phone,
        });
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Network Error");
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Mobile Number Verification
      </Text>

      {!otpSent && (
        <>
          <Text style={{ fontSize: 16 }}>Enter your phone number</Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 12,
              marginTop: 10,
              fontSize: 16,
            }}
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "black",
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
            }}
            onPress={sendOtp}
            disabled={loading}
          >
            <Text
              style={{ color: "white", textAlign: "center", fontSize: 18 }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {otpSent && (
        <>
          <Text style={{ marginTop: 20 }}>OTP sent to {phone}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputs[index]}
                style={{
                  width: 60,
                  height: 60,
                  borderWidth: 1,
                  borderRadius: 10,
                  textAlign: "center",
                  fontSize: 24,
                }}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "black",
              padding: 15,
              borderRadius: 10,
            }}
            onPress={verifyOtp}
            disabled={loading}
          >
            <Text
              style={{ color: "white", textAlign: "center", fontSize: 18 }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sendOtp}>
            <Text style={{ marginTop: 15, textAlign: "center" }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
