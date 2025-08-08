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
    correctAnswer: string;
    choices: { text: string; label: string }[];
  }[];
}

const CreateQuestionSetForm = () => {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [
      //   {
      //     choices: [],
      //     correctAnswer: "",
      //   },
    ],
  };
  const methods = useForm({ defaultValues });
  const { watch, register } = methods;
  console.log("Form values: ", watch());

  return (
    <div>
      <FormProvider {...methods}>
        <form>
          <div>
            <label className="text-white">EnterTitle: </label>
            <input
              className="w-sm text-sm text-white border border-gray-400 rounded-lg px-2 py-2"
              {...register("title")}
              placeholder={"Enter your title"}
            />
          </div>
          <CreateQuestion />
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
      correctAnswer: "",
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
            <div>
              <input
                {...register(`questions.${index}.questionText`)}
                placeholder="Enter Questions"
              />
              <button type="button" onClick={removeQuestionHandler}>
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
      label: "",
      text: "",
      //   correctAnswer: [],
    });
  };
  return (
    <div>
      {fields?.map((field, index) => {
        const removeQuestionHandler = () => {
          remove(index);
        };
        return (
          <div className="text-white" key={index}>
            <div>
              <input
                {...register(
                  `questions.${questionIndex}.choices.${index}.text`
                )}
                placeholder="Enter Choices"
              />
              <button type="button" onClick={removeQuestionHandler}>
                Remove Choices
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
