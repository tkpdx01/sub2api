package handler

import (
	"bytes"
	"io"

	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
)

// PeekRequestBody reads the request body and restores it so it can be read again.
// The body bytes are also cached in the gin context under "_request_body_cache".
func PeekRequestBody(c *gin.Context) ([]byte, error) {
	if c.Request.Body == nil {
		return nil, nil
	}
	body, err := io.ReadAll(io.LimitReader(c.Request.Body, 1<<20)) // 1MB limit for peeking
	if err != nil {
		return nil, err
	}
	// Restore the body for downstream handlers
	c.Request.Body = io.NopCloser(bytes.NewReader(body))
	c.Set("_request_body_cache", body)
	return body, nil
}

// ExtractModelFromJSON extracts the "model" field from a JSON body using gjson.
func ExtractModelFromJSON(body []byte) string {
	result := gjson.GetBytes(body, "model")
	if result.Type == gjson.String {
		return result.String()
	}
	return ""
}
