package main

import (
	"embed"
	"fmt"
	"net/http"

	"github.com/a-h/templ"
)

//go:embed css
var FS embed.FS

func main() {
	componenet := hello("World")
	http.Handle("/", templ.Handler(componenet))
	http.Handle("/public/", http.StripPrefix("/public", http.FileServer(http.FS(FS))))
	fmt.Println("Server started at 3000")
	http.ListenAndServe("localhost:3000", nil)
}
