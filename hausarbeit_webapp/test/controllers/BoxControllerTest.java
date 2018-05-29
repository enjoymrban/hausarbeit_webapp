package controllers;

import org.junit.Test;
import org.apache.http.*;


public class BoxControllerTest extends HttpMessage{


    @Test
    public void testBoxController() {

   // Given
  
   HttpUriRequest request = new HttpGet("https://api.github.com/users/" + name);
 
   // When
   HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
 
   // Then
   assertThat(
                     httpResponse.getStatusLine().getStatusCode(),
                     equalTo(HttpStatus.SC_NOT_FOUND));
    }
}
}
