package api;

import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.ContentType;

import static org.junit.Assert.assertEquals;


public class BoxApiTest {


    @Test
    public void testPOSTBox() {
        try {

            String payload = "{\"title\":\"testTitle\",\"description\":\"John\",\"color\":\"green\"}";
            StringEntity entity = new StringEntity(payload,
                    ContentType.APPLICATION_FORM_URLENCODED);

            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost request = new HttpPost("http://localhost:9000/api/box");
            request.setEntity(entity);
            request.setHeader("Content-type", "application/json");

            HttpResponse response = httpClient.execute(request);
            assertEquals(200, response.getStatusLine().getStatusCode());


        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Test
    public void testGETAllBoxes() {
        try {
            URL url = new URL("http://localhost:9000/api/box");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // Response code
            int responseCode = con.getResponseCode();


            // The JSON response
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );


            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Test if responseCode equals 200
            assertEquals(200, responseCode);

            // Tests:
            // Title equals "englisch"
            // description equals "letzte Prüfung"
            // color equals "green"
            String responseJsonString = response.toString();
            JSONArray jsonarray = new JSONArray(responseJsonString);
            assertEquals("englisch", jsonarray.getJSONObject(0).getString("title"));
            assertEquals("letzte Prüfung", jsonarray.getJSONObject(0).getString("description"));
            assertEquals("green", jsonarray.getJSONObject(0).getString("color"));




        } catch (Exception e) {
            e.printStackTrace();

        }


    }

    @Test
    public void testGETBoxWithId() {
        int boxid = 2;
        try {
            URL url = new URL("http://localhost:9000/api/box/" + boxid);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // Response code
            int responseCode = con.getResponseCode();


            //The JSON response
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Test if responseCode equals 200
            assertEquals(200, responseCode);


            // Tests Box with Id 2
            // Title equals "Geografie"
            // description equals "Europas Hauptstädte"
            // color equals "red"
            String responseJsonString = response.toString();
            JSONObject jsonObj = new JSONObject(responseJsonString);
            assertEquals("Geografie", jsonObj.getString("title"));
            assertEquals("Europas Hauptstädte", jsonObj.getString("description"));
            assertEquals("red", jsonObj.getString("color"));

        } catch (Exception e) {
            e.printStackTrace();

        }

    }


}




