# muscle_checker
筋トレの成果を最大限にするために、トレーニング指標となるRM値や適性トレーニング、体の変化を数値化したBMI（ボディマス指数）/FFMI（徐脂肪量指数）を計算してくれるパッケージ
<img width="366" height="100" alt="スクリーンショット 2025-12-23 095759" src="https://github.com/user-attachments/assets/e9613b67-4764-4148-99fc-3cac59b9b310" />

# インストール
```
npm install muscle_checker
```
# 使用方法
## 起動
以下のコマンドで起動できます。
```
muscle_checker
```
## 最大挙上重量
<img width="385" height="179" alt="スクリーンショット 2025-12-23 101009" src="https://github.com/user-attachments/assets/6b8bf571-29cd-4b16-8ca1-67e70ff07cc8" />
1. 持ち上げる重量を入力する。
2. 持ち上げられる回数を1~10から選択する。
3. 結果として、重量・回数・最大拳上重量が出力される。

## 適正トレーニング
<img width="488" height="126" alt="スクリーンショット 2025-12-23 101445" src="https://github.com/user-attachments/assets/fc91a37e-41ee-4e22-9c56-6f29062fef75" />
1. 最大拳上重量を入力する。
2. 希望する回数を1~10から選択する。
3. 結果として、トレーニング回数（レップ）と適正な重量が出力される。

## BMI//FFMI
<img width="442" height="214" alt="スクリーンショット 2025-12-23 101844" src="https://github.com/user-attachments/assets/bfea112e-830b-4cb8-9870-b37282fa656a" />
<img width="483" height="218" alt="スクリーンショット 2025-12-23 101923" src="https://github.com/user-attachments/assets/8457fe43-fc58-41fc-a23c-0991bae25058" />
1. 身長を入力する。
2. 体重を入力する。
3. 体脂肪率が分かれば入力する。分からなければEnter。
4. 結果として、BMIとFFMI（体脂肪率が分かる場合）が出力される。
