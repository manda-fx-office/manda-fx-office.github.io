# TRANSITION SYSTEM Androidタブレット 作業引き継ぎ・復元基準

記録日: 2026-11-13（日本時間）
対象リポジトリ: manda-fx-office/manda-fx-office.github.io
**修正対象ブランチのみ**: `test/community-kokonimodoru-v1-integration-20261112`
Renderテスト環境: https://transition-tablet-pre2050-recovery.onrender.com/

## 最重要：復元基準（HOME操作復旧V1）
- **基準コミット**: `69ca371f85a341961057281cdf68ec7bedc1b728`
- **RenderデプロイID**: `dep-dbr9vu5g1s2s73fsfme0`
- Render公開状態: `live`（2026-11-13T05:28:42Z）
- **ユーザー実機確認済み**: TOPの「FXの入口」→ HOMEが表示され、HOMEの01〜05を押すとフリーズしていた不具合が解消（ユーザー発言「ここだけ、治った」）。この機能は今後絶対に壊さない。
- 現在のテスト起動ファイル: `android_start_v2.html`
- TOP導線ラッパー: `android_tablet_top_v1_navigation_restore_20261113.html`
- TOP表示元: `android_tablet_top_v1_bgm_single_test.html`
- HOME表示元: `android_tablet_home_v6_preview_direct_V2_20261105.html`
- HOMEのフリーズ対策: 同ファイル末尾の MutationObserver によるリンク属性の無限書換えを防止。
- 01〜05: ラッパー側で `href="#detail-..."` を横取りせず、HOME内部の詳細表示処理に委ねる。

## 未解決（ユーザーの指示）
1. TOPをURLから起動すると旧式TOPが2〜3秒表示されて新式に切り替わる。起動直後から新式TOPを表示すること。**未修正**。
2. TOPからすべてのページへの導線と、各ページの戻り先を正しい保存版に接続。**全体として未確認・未完了**。
3. TOPボタン表示「FXの入口」→ 正常なタブレットHOME。表示修正とHOMEの01〜05はユーザー確認済みだが、他のHOME内導線は未確認。
4. 伝助のインジケータ保存版V1: `伝助のインジケータ_ここに戻る_V1.html`。6カテゴリ、各5カード、前へ／次へ、ページトップに戻る。**現行起動からの全動作未確認**。
5. コミュニティー保存版V2: `COMMUNITY_ここに戻るV2_20261112.html`。**現行起動からの全動作未確認**。
6. SYSTEM、BOARD、LOGIN、管理人Q&A、証券会社、タスクバーロゴ、全戻りボタンの動作。**未確認**。
7. 現行TOPには旧式の4ボタン（FXの入口・伝助・証券会社・管理人Q&A）が初期表示される。ユーザーが承認した新式TOP全体の表示と一致するか、保存版と比較する必要がある。**未確認**。

## 変更禁止・作業規則
- **PC版・スマホ保存版・mainブランチには一切変更しない**。
- ユーザーが承認したHOMEの01〜05機能を壊さない。
- 正常版を新しく作り直さず、既存の保存版を調べて直接導線をつなぐ。
- 画面デザインやページ内機能は、導線修復に必要ない限り変更しない。
- 修正前にこの復元コミットと対象ファイルを確認し、修正はテストブランチだけに限定する。
- 変更後は①直接確認URL ②テストアプリ起動URLの**2URL**を提示。
- Renderサービス `srv-dbpbidtbedkc7389j2r0` は **autoDeploy=no**。GitHub更新後は明示的にRenderデプロイを実行し、`live` を確認してからURLを案内。
- **実機正常はユーザーが確認するまで断定しない**。ユーザー承認後のみmainへの反映を検討する。
- 変更した部分が不具合なら、保存済みの基準コミットに戻せるようにする。

## 確認URL（現在のテスト環境）
① https://transition-tablet-pre2050-recovery.onrender.com/android_tablet_top_v1_navigation_restore_20261113.html
② https://transition-tablet-pre2050-recovery.onrender.com/android_start_v2.html

## 新しいチャットへの引き継ぎ
このファイルをGitHubの上記テストブランチから読み込み、復元基準コミットと未解決項目を照合してから作業を再開する。**最初に勝手な修正をしない**。
