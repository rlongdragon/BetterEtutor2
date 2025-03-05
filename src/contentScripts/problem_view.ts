const diff_match_patch = require("./diff_match_patch.js");

const dmp = new diff_match_patch.diff_match_patch();

interface TestCase {
  timeLimit: string | null;
  executionTime: string | null;
  input: string | null;
  output: string | null;
  expectedOutput: string | null;
  status: string | null;
}

(() => {
  function executeScript({
    massageToMessage,
    enableBetterTable,
    enableSpaceNewlineDisplay
  }: {
    massageToMessage: boolean;
    enableBetterTable: boolean;
    enableSpaceNewlineDisplay: boolean;
  }) {
    window.addEventListener("load", () => {
      function execute() {
        if (massageToMessage) {
          ((element) => {
            if (element) {
              element.innerHTML = element.innerHTML.replace(
                "Massage",
                "Message"
              );
            }
          })(
            document.querySelector(
              "body > div.body-box > div > div.row > div:nth-child(3) > div > div.problem-view.p-2 > table > tbody > tr:nth-child(2) > td"
            )
          );
        }

        if (enableBetterTable) {
          const exampleTestCases = document.querySelector(
            "body > div.body-box > div > div.row > div:nth-child(3) > div > div:nth-child(3) > table"
          );
          if (exampleTestCases) {
            const rows = exampleTestCases.querySelectorAll("tbody > tr");
            const tableData = Array.from(rows).map((row) => {
              const cells = row.querySelectorAll("td");
              return Array.from(cells).map((cell) =>
                cell.firstElementChild
                  ? (cell.firstElementChild as HTMLTextAreaElement).value
                  : ""
              );
            });

            let innerHTML = `
<style>
.br {
  position: absolute;
}
.br::after {
  content: "↵";
  color: #DDD;
  user-select: none;
}

.space {
  position: absolute;
}
.space::after {
  content: "·";
  color: #DDD;
  user-select: none;
}

.item + .item {
  margin-top: 10px;
}

.box {
  border: #ddd 1px solid;
  font-family: monospace;

  .title {
    background-color: #f5f5f5;
    padding: 10px 15px;
    border-bottom: #ddd 1px solid;
  }

  .content {
    position: relative;
    padding: 10px 15px;
  }
}

.copy {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 16px;
  width: 16px;
  padding: 10px;
  border-left: #ddd 1px solid;
  border-bottom: #ddd 1px solid;
  background-color:#f5f5f5;
  cursor: pointer;
  box-sizing: content-box;

  svg {
    position: absolute;
  }
}

.msg {
  background-color: #E6E6E6;
  color: #333;
  width: max-content;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
}

.msg::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #E6E6E6;
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
}


.msg.hidden {
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
<div class="data p-2">`;

            for (const index in tableData) {
              const rowData = tableData[index];

              let exampleInput = rowData[2];
              let exampleOutput = rowData[3];

              if (enableSpaceNewlineDisplay) {
                exampleInput = exampleInput
                  .replace(/ /g, "<span class='space'></span> ")
                  .replace(/\n/g, "<span class='br'></span>\n");
                exampleOutput = exampleOutput
                  .replace(/ /g, "<span class='space'></span> ")
                  .replace(/\n/g, "<span class='br'></span>\n");
              }

              innerHTML += `
<div class="row item">
<div class="col-lg-6 col-md-12">
<div class="box">
<div class="title">範例輸入 #${parseInt(index) + 1}</div>
<div class="content">
<span class="copy">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" style="display: none"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>
<div class="msg hidden">已複製</div>
</span>
<pre style="margin: 0">${exampleInput}</pre></div>
</div>
</div>
<div class="col-lg-6 col-md-12">
<div class="box">
<div class="title">範例輸出 #${parseInt(index) + 1}</div>
<div class="content"><pre style="margin: 0">${exampleOutput}</pre></div>
</div>
</div>
</div>`;
            }

            innerHTML += `
</div>
<script>
`;
            let element = document.querySelector(
              "body > div.body-box > div > div.row > div:nth-child(3) > div > div:nth-child(3)"
            );
            if (element) {
              element.innerHTML = innerHTML;
            }

            const copyButtons = document.querySelectorAll(".copy");
            copyButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const content = button.nextElementSibling?.textContent;
                if (!content) return;

                navigator.clipboard.writeText(content);

                console.log(button.firstChild);
                const checkMark = button.querySelector(
                  "svg > path:first-child"
                );
                const msg = button.querySelector(".msg");

                if (checkMark && msg) {
                  (checkMark as HTMLElement).style.display = "block";
                  msg.classList.remove("hidden");
                  setTimeout(() => {
                    (checkMark as HTMLElement).style.display = "none";
                    msg.classList.add("hidden");
                  }, 1000);
                }
              });
            });
          }

          const submitResult = document.querySelector(
            "body > div.body-box > div > div.row > div:nth-child(3) > div > div.problem-view.p-2"
          );
          const check = document.querySelector(
            "body > div.body-box > div > div.row > div:nth-child(3) > div > div.problem-view.p-2 > h3"
          );

          if (
            submitResult &&
            check?.textContent == "查看最近一次提交的執行结果"
          ) {
            const result = {
              time: submitResult.querySelector(
                "tbody > tr:nth-child(1) > td:nth-child(1)"
              )?.textContent,
              status: submitResult.querySelector(
                "tbody > tr:nth-child(1) > td:nth-child(2)"
              )?.textContent,
              run_time: submitResult.querySelector(
                "tbody > tr:nth-child(1) > td:nth-child(3)"
              )?.textContent,
              memory: submitResult.querySelector(
                "tbody > tr:nth-child(1) > td:nth-child(4)"
              )?.textContent,
              language: submitResult.querySelector(
                "tbody > tr:nth-child(1) > td:nth-child(5)"
              )?.textContent,
              resultBar: document.querySelector(
                ".result-bar"
              ) as HTMLButtonElement,
              compilerMessage: submitResult.querySelector(
                "tbody > tr:nth-child(3) > td"
              )?.textContent
            };

            const testCases: TestCase[] = [];

            const testCasesResult = submitResult.querySelector(
              "tbody > tr:nth-child(5) > td > table"
            );
            if (testCasesResult) {
              const rows = testCasesResult.querySelectorAll("tbody > tr");
              for (const row of rows) {
                const cells = row.querySelectorAll("td");
                const timeLimit = cells[0].textContent;
                const executionTime = cells[5].textContent;
                const inputTextarea = cells[2].querySelector("textarea");
                const input = inputTextarea
                  ? inputTextarea?.value
                  : cells[2].textContent;
                const outputTextarea = cells[3].querySelector("textarea");
                const output = outputTextarea
                  ? outputTextarea?.value
                  : cells[3].textContent;
                const expectedOutputTextarea =
                  cells[4].querySelector("textarea");
                const expectedOutput = expectedOutputTextarea
                  ? expectedOutputTextarea?.value
                  : cells[4].textContent;
                const status = cells[7].textContent;
                testCases.push({
                  timeLimit,
                  executionTime,
                  input,
                  output,
                  expectedOutput,
                  status
                });
              }
            }

            let innerHTML = `
<style>
.br {
  position: absolute;
}
.br::after {
  content: "↵";
  color: #DDD;
  user-select: none;
}

.red-br {
  position: absolute;
}
.red-br::after {
  content: "↵";
  color: #F66;
  user-select: none;
}

.space {
  position: absolute;
}
.space::after {
  content: "·";
  color: #DDD;
  user-select: none;
}

.red-space {
  position: absolute;
}
.red-space::after {
  content: "·";
  color: #F66;
  user-select: none;
}

.ac {
  color: #00BB00;
  font-weight: bold;
}

.item + .item {
  margin-top: 10px;
}

.box {
  border: #ddd 1px solid;
  font-family: monospace;

  .title {
    background-color: #f5f5f5;
    padding: 10px 15px;
    border-bottom: #ddd 1px solid;
  }

  .content {
    position: relative;
    padding: 10px 15px;
  }
}

button.result-bar {
  color: #333;
  background-color: #FFFFFF00;
  padding: 1px 5px;
  border: #335 1px solid;
  font-size: 1em;
}

button.result-bar:hover {
  background-color:rgba(255, 255, 255, 0.45);
  color: #333;
}

.copy {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 16px;
  width: 16px;
  padding: 10px;
  border-left: #ddd 1px solid;
  border-bottom: #ddd 1px solid;
  background-color:#f5f5f5;
  cursor: pointer;
  box-sizing: content-box;

  svg {
    position: absolute;
  }
}

.msg {
  background-color: #E6E6E6;
  color: #333;
  width: max-content;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
}

.msg::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #E6E6E6;
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
}


.msg.hidden {
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
<div class="result p-2">
            `;

            innerHTML += `
<div class="row item">
<div class="col-12">
<div class="box">
<div class="title">
<div class="hstack gap-3">
<div>
執行結果：<span class="${result.status == "完全正確" ? "ac" : ""}">${
              result.status == "完全正確" ? "通過" : `錯誤：${result.status}`
            }</span>
(${result.run_time}s, ${result.memory}MB)
</div>
<div>
${result.time}
</div>
</div>
</div>
</div>
</div>
</div>
`;

            if (
              result.compilerMessage &&
              result.compilerMessage.trim() !== ""
            ) {
              innerHTML += `
<div class="row item">
<div class="col-12">
<div class="box">
<div class="title">編譯器訊息</div>
<div class="content">
<span class="copy">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" style="display: none"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>
<div class="msg hidden">已複製</div>
</span>
<pre style="margin: 0; color: #fe2a2c; font-weight: 600">${result.compilerMessage.slice(
                12
              )}</pre>
</div>
</div>
</div>
`;
            }

            if (testCases.length > 0) {
              innerHTML += `<div class="item">`;

              for (const index in testCases) {
                const testCase = testCases[index];
                console.log(testCase);

                let input = testCase.input;
                let output = testCase.output;
                let expectedOutput = testCase.expectedOutput;

                if (!input || !output || !expectedOutput) {
                  continue;
                }

                if (enableSpaceNewlineDisplay) {
                  input = input
                    .replace(/ /g, "<span class='space'></span> ")
                    .replace(/\n/g, "<span class='br'></span>\n");
                }

                const CopyButton = `<span class="copy"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" style="display: none"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>
<div class="msg hidden">已複製</div>
</span>`;

                innerHTML += `
<div class="row item"> 
<div class="col-12">
<div class="box">
<div class="title">
#${parseInt(index) + 1}：<span class="${
                  testCase.status == "完全正確" ? "ac" : ""
                }">${
                  testCase.status == "完全正確"
                    ? "通過"
                    : `錯誤：${testCase.status}`
                } </span> (${testCase.executionTime}s / ${testCase.timeLimit}s)
</div>
${
  testCase.status != "完全正確"
    ? `<div class="content">
${
  input == "保密"
    ? `測資資訊未公開`
    : `
    <div class="row">

    <div class="col-4">
    <div class="box">
    <div class="title">輸入</div>
    <div class="content">
    ${CopyButton}
    <pre style="margin: 0">${input}</pre>
    </div>
    </div>
    </div>

    <div class="col-8">
    <div class="box">
    <div class="title">輸出</div>
    <div class="content" style="padding: 0">
    <div style="display: flex;" class="output">
      <div style="flex: 1; padding: 0; border-right: #ddd 1px solid" class="content">
        ${CopyButton}
        <pre style="padding: 10px 15px;margin: 0">${testCase.output}</pre>
      </div>
      <div style="flex: 1; padding: 0;" class="content">
        ${CopyButton}
        <pre style="padding: 10px 15px;margin: 0">${testCase.expectedOutput}</pre>
      </div>
    </div>
    </div>
    </div>
    </div>

    </div>
    `
}
</div>`
    : ``
}
</div>
</div>
</div>
                `;
              }
            }

            const resultElement = document.createElement("div");
            resultElement.innerHTML = innerHTML;

            if (result.resultBar && result.language) {
              result.resultBar.className = "result-bar ms-auto";
              result.resultBar.textContent = result.language;
              const titleDiv = resultElement.querySelector(".title > div");
              if (titleDiv) {
                const children = titleDiv.children;
                if (children.length >= 2) {
                  titleDiv.insertBefore(result.resultBar, children[1]);
                } else {
                  titleDiv.appendChild(result.resultBar);
                }
              }
            }

            submitResult.parentElement?.appendChild(resultElement);
            submitResult.remove();

            const copyButtons = document.querySelectorAll(".copy");
            copyButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const content = button.nextElementSibling?.textContent;
                if (!content) return;

                navigator.clipboard.writeText(content);

                console.log(button.firstChild);
                const checkMark = button.querySelector(
                  "svg > path:first-child"
                );
                const msg = button.querySelector(".msg");

                if (checkMark && msg) {
                  (checkMark as HTMLElement).style.display = "block";
                  msg.classList.remove("hidden");
                  setTimeout(() => {
                    (checkMark as HTMLElement).style.display = "none";
                    msg.classList.add("hidden");
                  }, 1000);
                }
              });
            });

            const outputElements = document.querySelectorAll(".output");
            for (const outputElement of outputElements) {
              const preElements = outputElement.querySelectorAll("pre");
              const output = preElements[0];
              const expectedOutput = preElements[1];

              console.log(output.textContent, expectedOutput.textContent);

              if (output && expectedOutput) {
                const diff = dmp.diff_main(
                  output.textContent || "",
                  expectedOutput.textContent || ""
                );
                const ds = dmp.diff_prettyHtml(diff);

                const diffContainer = document.createElement("div");
                diffContainer.innerHTML = ds;

                const removedDel = diffContainer.cloneNode(true) as HTMLElement;
                const removedIns = diffContainer.cloneNode(true) as HTMLElement;

                removedDel.querySelectorAll("del").forEach((el) => el.remove());
                removedIns.querySelectorAll("ins").forEach((el) => el.remove());

                // output.innerHTML = removedDel.innerHTML;
                expectedOutput.innerHTML = removedDel.innerHTML;

                if (enableSpaceNewlineDisplay) {
                  expectedOutput.querySelectorAll("span").forEach((el) => {
                    el.innerHTML = el.innerHTML
                      .replace(/ /g, "<span class='space'></span> ")
                      .replace(/¶/g, "<span class='br'></span>\n");
                  });
                  expectedOutput.querySelectorAll("del").forEach((el) => {
                    el.innerHTML = el.innerHTML
                      .replace(/ /g, "<span class='red-space'></span> ")
                      .replace(/¶/g, "<span class='red-br'></span>\n");
                  })

                  output.innerHTML = output.innerHTML
                    .replace(/ /g, "<span class='space'></span> ")
                    .replace(/\n/g, "<span class='br'></span>\n");
                }
              }
            }
          }
        }
      }

      massageToMessage
        ? ((element) => {
            if (element) {
              element.innerHTML = element.innerHTML.replace(
                "Massage",
                "Message"
              );
            }
          })(document.querySelector("#compiler_massage"))
        : null;

      execute();

      const targetNode = document.querySelector(
        "body > div.body-box > div > div.row > div:nth-child(3)"
      );

      if (targetNode) {
        const config = { childList: true, subtree: true, characterData: true };

        const observer = new MutationObserver(function (
          mutationsList,
          observer
        ) {
          for (const mutation of mutationsList) {
            if (
              mutation.type === "childList" ||
              mutation.type === "characterData"
            ) {
              observer.disconnect();
              execute();
              observer.observe(targetNode, config);
            }
          }
        });

        observer.observe(targetNode, config);
      }
    });
  }

  chrome.storage.sync.get(
    [
      "massage_to_message",
      "enable_better_table",
      "enable_space_newline_display"
    ],
    (result) => {
      const massageToMessage = result.massage_to_message;
      const enableBetterTable = result.enable_better_table;
      const enableSpaceNewlineDisplay = result.enable_space_newline_display;
      if (massageToMessage || enableBetterTable) {
        executeScript({
          massageToMessage,
          enableBetterTable,
          enableSpaceNewlineDisplay
        });
      }
    }
  );
})();
