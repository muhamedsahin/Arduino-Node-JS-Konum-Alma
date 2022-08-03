#include <TinyGPS.h>
TinyGPS gps;
#include <SoftwareSerial.h>
SoftwareSerial ss(9, 10); //rx tx
void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
  ss.begin(9600);
    while(ss.available())
 Serial.write(ss.read()); 
    ss.println("AT+CGNSPWR=1");
  delay(1000);
    while(ss.available())
 Serial.write(ss.read());
     while(ss.available())
 Serial.write(ss.read()); 
    ss.println("AT+CGNSTST=1");
  delay(1000);
    while(ss.available())
 Serial.write(ss.read());
}

void loop() {
  // put your main code here, to run repeatedly:

    while(Serial.available())
 ss.write(Serial.read());

  smartdelay(1000);
  Serial.println();

  //uint8_t sat = gps.satellites();
  //Serial.print("sat: "); Serial.println(sat);

  float flat, flon;
  unsigned long age;
  gps.f_get_position(&flat, &flon, &age);
  Serial.print(flat, 6);
  Serial.print(",");
  Serial.print(flon, 6);
  Serial.print(",");
  int spd = gps.f_speed_kmph();
  Serial.println(spd);

  int year;
  byte month, day, hour, minute, second, hundredths;
  unsigned long age2;
  gps.crack_datetime(&year, &month, &day, &hour, &minute, &second, &hundredths, &age2);


}
static void smartdelay(unsigned long ms) {
  unsigned long start = millis();
  do {
    while (ss.available())
      gps.encode(ss.read());
  } while (millis() - start < ms);
}
