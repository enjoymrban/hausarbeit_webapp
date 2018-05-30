package controllers;

import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

import static org.junit.Assert.assertEquals;


public class BoxControllerTest {



    @Test
    public void testPOSTBox() {
        try {
            String postUrl = "http://localhost:9000/api/box";// put in your url

            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(postUrl);
            StringEntity postingString = new StringEntity("{\"title\"=\"testBoxTitle\",\"description\"=\"testBoxDescription\"}");//gson.tojson() converts your pojo to json
            post.setEntity(postingString);
            post.setHeader("Content-type", "application/json");
            HttpResponse response = httpClient.execute(post);

            System.out.println(response);
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

//            Response code
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );

//           The JSON response
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            assertEquals(200, responseCode);


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

//            Response code
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );

//           The JSON response
            String inputLine;
            StringBuffer responseJson = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                responseJson.append(inputLine);
            }
            in.close();

//            Test if @responseCode equals 200
            assertEquals(200, responseCode);


        } catch (Exception e) {
            e.printStackTrace();

        }

    }

}


