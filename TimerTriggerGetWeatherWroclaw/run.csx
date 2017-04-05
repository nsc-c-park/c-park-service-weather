#r "Newtonsoft.Json"
#r "System.Configuration"
#r "System.Data"

using System;
using Newtonsoft.Json;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;

public static void Run(TimerInfo myTimer, TraceWriter log)
{
    log.Info($"C# Timer trigger function executed at: {DateTime.Now}");    
    var parkingInfo = GetParkingInfo().Result;
    log.Info($"Name: {parkingInfo.name}");
    var cnnString  = ConfigurationManager.ConnectionStrings["SqlConnection"].ConnectionString;
        
    using(var connection = new SqlConnection(cnnString))
    {
        connection.Open();
        
        using (SqlCommand cmd = new SqlCommand("INSERT INTO WeatherWroclaw (date, temp, clouds, sunrise, sunset, wind, pressure, humidity, description) VALUES (@date, @temp, @clouds, @sunrise, @sunset, @wind, @pressure, @humidity, @description)", connection))
        {
            cmd.Parameters.AddWithValue("@date", DateTime.Now);
            cmd.Parameters.AddWithValue("@temp", parkingInfo.main.temp);
            cmd.Parameters.AddWithValue("@clouds", parkingInfo.clouds.all);
            cmd.Parameters.AddWithValue("@sunrise", parkingInfo.sys.sunrise);
            cmd.Parameters.AddWithValue("@sunset", parkingInfo.sys.sunset);
            cmd.Parameters.AddWithValue("@wind", parkingInfo.wind.speed);
            cmd.Parameters.AddWithValue("@pressure", parkingInfo.main.pressure);
            cmd.Parameters.AddWithValue("@humidity", parkingInfo.main.humidity);
            cmd.Parameters.AddWithValue("@description", "Test git deploy");
            cmd.ExecuteNonQuery();
        }
    }
}

private static async Task<RootObject> GetParkingInfo()
{
    using (var client = new HttpClient())
    {
        string repUrl = "http://api.openweathermap.org/data/2.5/weather?q=Wroclaw,uk&appid=1ce369e9e52bf7b8d9e8b96ddf7c16bd";
        HttpResponseMessage response = await client.GetAsync(repUrl);
        if (response.IsSuccessStatusCode)
        {
            string result = await response.Content.ReadAsStringAsync();
            var rootResult = JsonConvert.DeserializeObject<RootObject>(result);
            return rootResult;
        }
        else
        {
            return null;
        }
    }
}

public class Coord
{
    public double lon { get; set; }
    public double lat { get; set; }
}

public class Weather
{
    public int id { get; set; }
    public string main { get; set; }
    public string description { get; set; }
    public string icon { get; set; }
}

public class Main
{
    public double temp { get; set; }
    public int pressure { get; set; }
    public int humidity { get; set; }
    public double temp_min { get; set; }
    public double temp_max { get; set; }
}

public class Wind
{
    public double speed { get; set; }
    public int deg { get; set; }
}

public class Clouds
{
    public int all { get; set; }
}

public class Sys
{
    public int type { get; set; }
    public int id { get; set; }
    public double message { get; set; }
    public string country { get; set; }
    public int sunrise { get; set; }
    public int sunset { get; set; }
}

public class RootObject
{
    public Coord coord { get; set; }
    public List<Weather> weather { get; set; }
    public string @base { get; set; }
    public Main main { get; set; }
    public int visibility { get; set; }
    public Wind wind { get; set; }
    public Clouds clouds { get; set; }
    public int dt { get; set; }
    public Sys sys { get; set; }
    public int id { get; set; }
    public string name { get; set; }
    public int cod { get; set; }
}