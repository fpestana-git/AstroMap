library(ggplot2)

ui <- fluidPage(
  sliderInput("sample", "Sample Value", 1, 100, 50),
  plotOutput("exprPlot")
)

server <- function(input, output, session) {
  output$exprPlot <- renderPlot({
    ggplot(data.frame(x = 1:100, y = rnorm(100)), aes(x, y)) +
      geom_line() + geom_vline(xintercept = input$sample, color = "red")
  })
}

shinyApp(ui, server)
