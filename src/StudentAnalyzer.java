import java.util.List;

public class StudentAnalyzer {

    public int countExcellentStudents(List<Double> scores) {
        if (scores == null || scores.isEmpty()) {
            return 0;
        }

        int count = 0;
        for (Double s : scores) {
            if (s == null) continue;

            if (s >= 8.0 && s <= 10.0) {
                count++;
            }
        }
        return count;
    }

}
