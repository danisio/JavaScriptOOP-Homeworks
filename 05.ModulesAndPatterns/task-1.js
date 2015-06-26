//# Modules and patterns
//==================================
//
//### Task 1.
//* Create a module for a `Telerik Academy course`
//  * The course has a `title` and `presentations`
//    * Each presentation also has a `title`
//    * There is a homework for each presentation
//  * There is a set of students listed for the course
//    * Each student has `firstname`, `lastname` and an `ID`
//      * IDs must be unique integer numbers which are at least 1
//  * Each student can submit a homework for each presentation in the course
//  * Create method `init()`
//    * Accepts a `string` - course title
//    * Accepts an `array of strings` - presentation titles
//    * Throws if there is an invalid title
//      * Titles do not start or end with spaces
//      * Titles do not have consecutive spaces
//      * Titles have at least one character
//    * Throws if there are no presentations
//  * Create method `addStudent()` which lists a student for the course
//    * Accepts a string in the format `'Firstname Lastname'`
//    * Throws if any of the names are not valid
//      * Names start with an upper case letter
//      * All other symbols in the name (if any) are lowercase letters
//    * Generates a unique student ID and returns it
//  * Create method `getAllStudents()` that returns an array of students in the format:
//    * {firstname: 'string', lastname: 'string', id: StudentID}
//  * Create method `submitHomework()`
//    * Accepts `studentID` and `homeworkID`
//      * homeworkID 1 is for the first presentation
//      * homeworkID 2 is for the second one
//      * ...
//    * Throws if any of the IDs are invalid
//  * Create method `pushExamResults()`
//    * Accepts an array of items in the format `{StudentID: ..., Score: ...}`
//      * StudentIDs which are not listed get 0 points
//    * Throw if there is an invalid StudentID
//    * Throw if same StudentID is given more than once ( he tried to cheat (: )
//    * Throw if Score is not a number
//  * Create method `getTopStudents()` which returns an array of the top **10 performing students**
//    * Array must be sorted from **best to worst**
//    * If there are less than 10, return them all
//    * The final score that is used to calculate the top performing students is done as follows:
//      * 75% of the exam result
//      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
function solve() {
    function validateTitle(title) {
        validateName(title);
    }

    function validatePresentations(arr) {
        var len,
            i;

        if (arr.length === 0) {
            throw new Error('Presentations are missing!?');
        }

        for (i = 0, len = arr.length; i < len; i += 1) {
            validateName(arr[i]);
        }
    }

    function validateName(item) {
        if (!item) {
            throw new Error(item + ' is undefined!');
        }

        if (typeof item !== 'string') {
            throw new Error('Title is not a string!');
        }

        if (/^ | $|[ ]{2,}/.test(item)) {
            throw new Error('The item ' + item + ' has extra spaces!')
        }
    }

    function validateStudentNames(name) {
        function isValidateName(item) {
            if (!/^[A-Z]/.test(item)) {
                throw new Error('First letter of name: ' + item + ' is not upper')
            }

            if (item.length > 1 && !/[a-z]+/.test(item)) {
                throw new Error('Letters(except first) in the name must be lower.')
            }
        }

        var splittedNames = name.split(' '),
            firstName = splittedNames[0],
            lastName = splittedNames[1];

        if (splittedNames.length === 1 || splittedNames.length > 2) {
            throw new Error('Only one name or more than 2 names for a student!')
        }

        isValidateName(firstName);
        isValidateName(lastName);
    }

    function addPresentations(value) {
        var arr = [],
            id = 1,
            i,
            len;

        for (i = 0, len = value.length; i < len; i += 1, id += 1) {
            arr.push({
                'name': value[i],
                'id': id
            });
        }

        return arr;
    }

    function validateID(ID, arr) {
        var result = arr.some(function (homework) {
            return homework.id === ID;
        });

        if (!result) {
            throw new Error('Invalid ID' + ID);
        }
    }

    function validateScore(score) {
        if (typeof score !== 'number') {
            throw new Error('Score is not a number: ' + score);
        }
    }

    function addResult(currentResult, arr) {
        var currentStudentIndex = arr.map(function (st) {
            return st.id;
        }).indexOf(currentResult.StudentID);

        if (arr[currentStudentIndex].scoreExam === 0) {
            arr[currentStudentIndex].scoreExam = currentResult.Score;
        } else {
            throw new Error('The student ID is repeated: ' + currentResult.StudentID)
        }
    }

    var Course = {
        init: function (title, presentations) {
            this.title = title;
            this.presentations = presentations;
            this.students = [];
            return this;
        },
        addStudent: function (name) {
            validateStudentNames(name);
            var id = this.students.length + 1,
                splittedNames = name.split(' ');

            this.students.push({
                'firstname': splittedNames[0],
                'lastname': splittedNames[1],
                'id': id,
                'homework': [],
                'scoreExam': 0,
                'finalScore': function () {
                    var submittedHomework = this.homework.length / Course.presentations.length,
                        result;

                    result = (75 / 100) * this.scoreExam + (25 / 100) * submittedHomework;

                    return result;
                }
            });

            return id;
        },
        getAllStudents: function () {
            return this.students.map(function (item) {
                return {
                    'firstname': item.firstname,
                    'lastname': item.lastname,
                    'id': item.id
                }
            });
        },
        submitHomework: function (studentID, homeworkID) {
            var currentStudentIndex = this.students.map(function (st) {
                return st.id;
            }).indexOf(studentID);

            validateID(studentID, this.students);
            validateID(homeworkID, this._presentations);

            this.students[currentStudentIndex].homework.push(homeworkID);
        },
        pushExamResults: function (results) {
            var i,
                len;

            for (i = 0, len = results.length; i < len; i += 1) {
                validateID(results[i].StudentID, this.students);
                validateScore(results[i].Score, this.students);
                addResult(results[i], this.students);
            }
        },
        getTopStudents: function () {
            var top = this.students.sort(function (x, y) {
                return y.finalScore() - x.finalScore();
            });

            top.length = Math.min(top.length, 10);
            return Course.getAllStudents.apply(this, top);
        },
        get title() {
            return this._title;
        },
        set title(value) {
            validateTitle(value);
            this._title = value;
        },
        get presentations() {
            return this._presentations;
        },
        set presentations(value) {
            validatePresentations(value);
            this._presentations = addPresentations(value);
        }
    };

    return Course;
}

