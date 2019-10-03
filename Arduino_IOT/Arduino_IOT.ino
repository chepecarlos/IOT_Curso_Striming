#ifdef ARDUINO_ARCH_ESP32
#include <WiFi.h>
#include <WiFiMulti.h>
WiFiMulti wifiMulti;
#else
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti wifiMulti;
#endif

int LedIndicador = 5;

void setup() {
  Serial.begin(115200);
  delay(10);
  Serial.println("Inciando Sistema");
  pinMode(LedIndicador, OUTPUT);
  wifiMulti.addAP("ALSW", "25264897");
  wifiMulti.addAP("ALSW2", "72103607");
  wifiMulti.addAP("ALSW", "Chepecarlos");
  Conectando()
}

void loop() {
  // put your main code here, to run repeatedly:
  Conectando();
}

void Conectando() {
  if (wifiMulti.run() != WL_CONNECTED) {
    digitalWrite(LedIndicador, 1);
    delay(2000);
    digitalWrite(LedIndicador, 1);
    delay(2000);
  } else {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }
}
