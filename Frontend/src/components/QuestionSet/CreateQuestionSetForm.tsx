import axios from "axios";
import React from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

interface QuestionSetForm {
  title: string;
  questions: {
    questionText: string;

    choices: { text: string; label: string; correctAnswer: boolean }[];
  }[];
}

const CreateQuestionSetForm = () => {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [
      {
        questionText: "",
        choices: [],
      },
    ],
  };

  const onSubmitHandler = (data: QuestionSetForm) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:3000/api/admin/questionset/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert("Question Set Created Successfully");
      })
      .catch((err) => {
        alert("Error");
      });
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;
  console.log("Form values: ", watch());
  return (
    <div className="flex justify-center items-center mt-10 ">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label className="text-white">Enter Title: </label>
            <input
              className="w-sm text-sm text-white border border-gray-400 rounded-lg px-2 py-2"
              {...register("title")}
              placeholder={"Enter your title"}
            />
          </div>
          <CreateQuestion />
          <button type="submit">Create QuestionSet</button>
        </form>
      </FormProvider>
    </div>
  );
};

function CreateQuestion() {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const AddQuestionHandler = () => {
    append({
      questionText: "",

      choices: [],
    });
  };

  return (
    <div>
      <h1 className="text-white text-lg">Create Questions</h1>
      {fields?.map((field, index) => {
        const removeQuestionHandler = () => {
          remove(index);
        };
        return (
          <div className="text-white" key={index}>
            <div className="gap-20">
              <input
                {...register(`questions.${index}.questionText`)}
                placeholder="Enter Questions"
              />
              <button
                type="button"
                onClick={removeQuestionHandler}
                className="w-25
               font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:brightness-110 py-2 px-2 mt-6 rounded-lg hover:opcity-80 cursor-pointer "
              >
                Remove
              </button>
            </div>
            <CreateChoices questionIndex={index} />
          </div>
        );
      })}
      <button
        className="w-40
               font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:brightness-110 py-2 px-2 mt-6 rounded-lg hover:opcity-80 cursor-pointer "
        type="button"
        onClick={AddQuestionHandler}
      >
        Add Questions
      </button>
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const AddChoicesHandler = () => {
    append({
      label: fields?.length.toString(),
      text: "",
      correctAnswer: false,
    });
  };
  return (
    <div>
      {fields?.map((field, index) => {
        const removeChoiceHandler = () => {
          remove(index);
        };

        return (
          <div className="text-white" key={index}>
            <div>
              <input
                type="checkbox"
                {...register(
                  `questions.${questionIndex}.choices.${index}.correctAnswer`
                )}
                placeholder="Enter Choice"
              />
              ;
              <input
                {...register(
                  `questions.${questionIndex}.choices.${index}.text`
                )}
                placeholder="Enter Choice"
              />
              <button type="button" onClick={removeChoiceHandler}>
                Remove Choice
              </button>
            </div>
          </div>
        );
      })}
      <button type="button" onClick={AddChoicesHandler}>
        Add Choices
      </button>
    </div>
  );
}

export default CreateQuestionSetForm;
