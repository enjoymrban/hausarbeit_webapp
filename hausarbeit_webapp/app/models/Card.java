package models;

public class Card {
    private Long id;
    private String question;
    private String answer;
    private int nTries;
    private int nCorrect;
    private Long categoryId;

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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
