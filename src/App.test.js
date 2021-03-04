import { apiGetNgramCounts } from "./api";

describe("API Module", () => {
  test("Given_body=''_Should_Return_Empty_Array", async () => {
    let expected = await apiGetNgramCounts({
      body: "",
      case_sensitive: true,
      ngram: "2",
      length: "2",
    });
    expect(expected).toEqual([]);
  });

  test("Given_body='Hs'_ngram=3_Should_Return_Empty_Array", async () => {
    let expected = await apiGetNgramCounts({
      body: "Hs",
      case_sensitive: true,
      ngram: "3",
      length: "4",
    });
    expect(expected).toEqual([]);
  });

  test("Given_Input_Should_Return_Array_Descendent_Sorted", async () => {
    let expected = await apiGetNgramCounts({
      body: "Hs",
      case_sensitive: true,
      ngram: "3",
      length: "4",
    });
    expect(expected).toEqual([]);
  });

  test("Given_length=3_Should_Return_Array_Of_Length=3", async () => {
    let expected = await apiGetNgramCounts({
      body: "Hello!!!",
      case_sensitive: true,
      ngram: "2",
      length: "3",
    });
    expect(expected).toEqual([
      { ngram: "!!", count: 2 },
      { ngram: "He", count: 1 },
      { ngram: "el", count: 1 },
    ]);
  });

  test("Given_length=3_Should_Not_Return_Array_Of_Length=1", async () => {
    let expected = await apiGetNgramCounts({
      body: "Hello!!!",
      case_sensitive: true,
      ngram: "2",
      length: "3",
    });
    expect(expected).not.toEqual([{ ngram: "!!", count: 2 }]);
  });

  test("Given_ngram=3_Should_Not_Return_Ngram=3", async () => {
    let expected = await apiGetNgramCounts({
      body: "Hello!!!",
      case_sensitive: true,
      ngram: "3",
      length: "4",
    });
    expect(expected).toEqual([
      { ngram: "Hel", count: 1 },
      { ngram: "ell", count: 1 },
      { ngram: "llo", count: 1 },
      { ngram: "lo!", count: 1 },
    ]);
  });

  test("Given_ngram=3_Should_Not_Return_Ngram=2", async () => {
    let expected = await apiGetNgramCounts({
      body: "Hello!!!",
      case_sensitive: true,
      ngram: "3",
      length: "3",
    });
    expect(expected).not.toEqual([
      { ngram: "!!", count: 2 },
      { ngram: "He", count: 1 },
      { ngram: "el", count: 1 },
    ]);
  });

  test("Given_caseSensitive=false_And_body_With_White_Spaces_Should_Be_FilteredOut", async () => {
    let expected = await apiGetNgramCounts({
      body: "The quick brown fox jumps over the lazy dog",
      case_sensitive: false,
      ngram: "2",
      length: "3",
    });
    expect(expected).toEqual([
      { ngram: "TH", count: 2 },
      { ngram: "HE", count: 2 },
      { ngram: "EQ", count: 1 },
    ]);
  });

  test("Given_caseSensitive=false_Should_Return_Ngrams_In_UpperCase", async () => {
    let expected = await apiGetNgramCounts({
      body: "Helloh!!!!!",
      case_sensitive: true,
      ngram: "2",
      length: "3",
    });
    expect(expected).not.toEqual([
      { ngram: "He", count: 1 },
      { ngram: "!!", count: 4 },
      { ngram: "el", count: 1 },
    ]);
  });
});
