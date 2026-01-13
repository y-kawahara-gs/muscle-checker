#!/usr/bin/env node

import enquirer from "enquirer";

const { prompt } = enquirer;

const CHOICE_RM = "最大拳上重量（RM値）"
const CHOICE_TRAINING = "適正トレーニング"
const CHOICE_BMI_FFMI = "BMI/FFMI"

main();

async function main() {
  const process = await chooseProcess();
  switch (process.answer) {
    case CHOICE_RM:
      await printRm();
      break;
    case CHOICE_TRAINING:
      await printRecommendedWeight();
      break;
    case CHOICE_BMI_FFMI:
      await printBmi();
      break;
  }
}

async function chooseProcess() {
  const processQuestion = {
    type: "select",
    name: "answer",
    message: "どれにしますか？",
    choices: [CHOICE_RM, CHOICE_TRAINING, CHOICE_BMI_FFMI],
  };
  return await prompt(processQuestion);
}

async function printRm() {
  console.log("RM測定");
  const weight = await askValue("重量を入力してください。(単位：kg)");
  const count = await selectCount("回数を入力してください。(数字のみ)");
  const rm = await caluculateRm(weight.answer, count.answer);
  console.log("--結果--");
  console.log(`重量：${weight.answer}kg`);
  console.log(`回数：${count.answer}回`);
  console.log(`あなたの最大拳上重量は${rm}kgです。`);
}

async function printRecommendedWeight() {
  const rm = await askValue("最大拳上重量を入力してください。(単位：kg)");
  const count = await selectCount("希望する回数を入力してください。(数字のみ)");
  const weight = await caluculateWeight(rm.answer, count.answer);
  console.log("--結果--");
  console.log(
    `${count.answer}レップのトレーニングには${weight}kgの重量がおすすめです。`,
  );
}

async function printBmi() {
  console.log("BMI測定");
  const height = await askValue("身長を入力してください。(単位:cm)");
  const bodyWeight = await askValue("体重を入力してください。(単位:kg)");
  const fatPercent = await askValue(
    "体脂肪率は分かりますか？(分からなければEnter)",
    true,
  );
  const bmiFfmi = await caluculateBmi(
    height.answer,
    bodyWeight.answer,
    fatPercent.answer,
  );
  console.log("--結果--");
  console.log(`身長：${height.answer}cm`);
  console.log(`体重：${bodyWeight.answer}kg`);
  console.log(`あなたのBMIは${bmiFfmi.bmi}です。`);
  console.log(`あなたのFFMIは${bmiFfmi.ffmi}です。`);
}

async function askValue(message, optional = false) {
  const quetion = {
    type: "input",
    name: "answer",
    message,
    validate: (value) => {
      if (optional && !value) return true;
      if (isNaN(value) || value <= 0)
        return "正の数字を半角入力してください！！";
      return true;
    },
  };
  return await prompt(quetion);
}

async function selectCount(message) {
  const countQuestion = {
    type: "select",
    name: "answer",
    message,
    choices: [...Array(10)].map((_, i) => i + 1).map(String),
    result(count) {
      return Number(count);
    },
  };
  return await prompt(countQuestion);
}

function caluculateRm(weight, count) {
  const rm = weight * (count / 40 + 1);
  return roundOff(rm, 100);
}

function caluculateWeight(rm, count) {
  const weight = rm / (count / 40 + 1);
  return roundOff(weight, 100);
}

function caluculateBmi(height, bodyWeight, fatPercent = null) {
  const BmiFfmi = {};
  const heightSquared = (height * 0.01) ** 2;
  const bmi = bodyWeight / heightSquared;
  const lbm = bodyWeight * (1 - fatPercent * 0.01);
  const ffmi = lbm / heightSquared;
  BmiFfmi.bmi = roundOff(bmi, 10);
  BmiFfmi.ffmi = fatPercent ? roundOff(ffmi, 10) : "測定不能";
  return BmiFfmi;
}

function roundOff(value, base) {
  return Math.round(value * base) / base;
}
