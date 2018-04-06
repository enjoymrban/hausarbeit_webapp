package models;

import javax.persistence.*;


@Entity(name="card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;
    private String answer;
    private int nTries;
    private int nCorrect;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

   @ManyToOne
   @JoinColumn(name = "box_id")
   private Box box;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getnTries() {
        return nTries;
    }

    public void setnTries(int nTries) {
        this.nTries = nTries;
    }

    public int getnCorrect() {
        return nCorrect;
    }

    public void setnCorrect(int nCorrect) {
        this.nCorrect = nCorrect;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }
}
