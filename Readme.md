# JKLearnapp

JKlearnapp is a Webapplication that alows users to create boxes and flashcards to learn efficiently

## Deployment

The App is deployed on heroku and can be visited here: https://jklearnapp.herokuapp.com/

## Running the tests

To run the tests an additional Library needs to be imported. For IntelliJ IDEA follow these steps:
File ---> Project Structure ---> Modules ---> Add (green cross) ---> JAR's or directories ---> add this path
```
C:\Users\Silvan Knecht\Documents\GitHub\hausarbeit_webapp\hausarbeit_webapp\javaExternalLibrary\java-json.jar
```
Then run the tests by right click on tests ---> Run 'All Tests'

### Break down into end to end tests

There is one test for each Model to test whether they work or not.

```
  @Test
    public void testBox(){
        Box box = new Box();

        box.setTitle("TestTitleBox");
        box.setDescription("TestDescriptionBox");
        box.setColor("green");


    assertEquals("TestTitleBox", box.getTitle());
        assertEquals("TestDescriptionBox", box.getDescription());
        assertEquals("green", box.getColor());


        }
```

There are also tests to test the get, getAll and post route. 

```
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
```


## Built With

* [Bootstrap](https://getbootstrap.com/) - Toolkit used
* [PlayFramework](https://www.playframework.com/) - Web Framework used


## Authors

* **Silvio Jäger, Silvan Knecht** 

See also the list of [contributors](https://github.com/enjoymrban/hausarbeit_webapp/contributors) who participated in this project.

